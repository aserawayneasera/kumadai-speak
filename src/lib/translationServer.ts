import { createHash } from 'node:crypto';
import { isTranslationProvider, type TranslationProvider, type TranslationServiceConfig } from './translation';

// This is an instance-local burst limit. A hosting firewall should enforce
// shared quotas on public/serverless deployments (see the setup guide).
const buckets = new Map<string, { count: number; expires: number }>();
let globalWindow = { count: 0, expires: 0 };

export function translationJson(body: unknown, status = 200) {
  return Response.json(body, {
    status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}

export function guardTranslationRequest(request: Request): Response | undefined {
  const origin = request.headers.get('origin');
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return translationJson({ code: 'forbidden' }, 403);
      }
    } catch { return translationJson({ code: 'forbidden' }, 403); }
  }
  if (request.headers.get('sec-fetch-site') === 'cross-site') {
    return translationJson({ code: 'forbidden' }, 403);
  }
  const now = Date.now();
  if (globalWindow.expires < now) globalWindow = { count: 0, expires: now + 60_000 };
  if (globalWindow.count >= 120) return translationJson({ code: 'rate_limit' }, 429);
  const address = request.headers.get('x-vercel-forwarded-for')
    ?? request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown';
  const key = createHash('sha256').update(address.split(',')[0].trim()).digest('hex');
  if (buckets.size > 2000) {
    buckets.forEach((value, id) => { if (value.expires < now) buckets.delete(id); });
    if (buckets.size > 2000) return translationJson({ code: 'rate_limit' }, 429);
  }
  const bucket = buckets.get(key) ?? { count: 0, expires: now + 60_000 };
  if (bucket.expires < now) { bucket.count = 0; bucket.expires = now + 60_000; }
  if (bucket.count >= 20) return translationJson({ code: 'rate_limit' }, 429);
  bucket.count += 1;
  globalWindow.count += 1;
  buckets.set(key, bucket);
}

export async function readTranslationBody(request: Request, maxBytes: number) {
  if (Number(request.headers.get('content-length')) > maxBytes) throw new Error('too_large');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('invalid_request');
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) { await reader.cancel(); throw new Error('too_large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const body = new Uint8Array(length);
  let offset = 0;
  chunks.forEach(chunk => { body.set(chunk, offset); offset += chunk.byteLength; });
  return body;
}

export async function fetchTranslationProvider(path: string, init: RequestInit, signal: AbortSignal, provider: TranslationProvider = 'openai') {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signal.addEventListener('abort', abort, { once: true });
  if (signal.aborted) controller.abort();
  const timeout = setTimeout(abort, 35_000);
  try {
    const url = provider === 'claude' ? 'https://api.anthropic.com/v1/messages' : `https://api.openai.com/v1/${path}`;
    const response = await fetch(url, { ...init, signal: controller.signal, cache: 'no-store' });
    const data = response.ok ? await response.json() : null;
    return { ok: response.ok, status: response.status, data };
  } finally {
    clearTimeout(timeout);
    signal.removeEventListener('abort', abort);
  }
}

export function translationServiceEnabled(provider: TranslationProvider) {
  const key = provider === 'claude' ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY;
  return Boolean(key?.trim()) && process.env.KUMASPEAK_TRANSLATION_ENABLED !== 'false';
}

export function translationServiceConfig(): TranslationServiceConfig {
  const providers = { openai: translationServiceEnabled('openai'), claude: translationServiceEnabled('claude') };
  const preference = process.env.KUMASPEAK_TRANSLATION_PROVIDER?.trim();
  const defaultProvider = isTranslationProvider(preference) && providers[preference]
    ? preference : providers.openai ? 'openai' : providers.claude ? 'claude' : 'openai';
  return { translationEnabled: providers.openai || providers.claude, recordingEnabled: transcriptionServiceEnabled(), defaultProvider, providers };
}

export function transcriptionServiceEnabled() {
  return translationServiceEnabled('openai') && process.env.KUMASPEAK_RECORDING_ENABLED !== 'false';
}
