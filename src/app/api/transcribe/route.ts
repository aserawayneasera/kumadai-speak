import { MAX_RECORDING_BYTES, MAX_TRANSLATION_LENGTH, isTranslationLanguage } from '@/lib/translation';
import { fetchTranslationProvider, guardTranslationRequest, readTranslationBody, transcriptionServiceEnabled, translationJson } from '@/lib/translationServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 45;

export async function POST(request: Request) {
  const blocked = guardTranslationRequest(request);
  if (blocked) return blocked;
  if (!transcriptionServiceEnabled()) return translationJson({ code: 'not_configured' }, 503);
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) {
    return translationJson({ code: 'invalid_request' }, 400);
  }
  let form: FormData;
  try {
    const bytes = await readTranslationBody(request, MAX_RECORDING_BYTES + 16_384);
    form = await new Response(bytes, { headers: { 'Content-Type': request.headers.get('content-type')! } }).formData();
  } catch { return translationJson({ code: 'invalid_recording' }, 400); }
  const audio = form.get('audio');
  const language = form.get('language');
  if (!(audio instanceof Blob) || !audio.size || audio.size > MAX_RECORDING_BYTES || !isTranslationLanguage(language)) {
    return translationJson({ code: 'invalid_recording' }, 400);
  }
  const mime = audio.type.split(';')[0];
  const extensions: Record<string, string> = { 'audio/webm': 'webm', 'audio/mp4': 'mp4', 'audio/mpeg': 'mp3', 'audio/wav': 'wav', 'audio/x-wav': 'wav' };
  const extension = extensions[mime];
  if (!extension) return translationJson({ code: 'invalid_recording' }, 400);
  const body = new FormData();
  body.set('file', audio, `speech.${extension}`);
  body.set('model', process.env.KUMASPEAK_TRANSCRIPTION_MODEL?.trim() || 'gpt-4o-mini-transcribe');
  body.set('language', language);
  body.set('response_format', 'json');
  try {
    const response = await fetchTranslationProvider('audio/transcriptions', {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }, body,
    }, request.signal);
    if (!response.ok) return translationJson({ code: response.status === 429 ? 'rate_limit' : 'transcription_failed' }, response.status === 429 ? 429 : 502);
    const result = response.data;
    if (typeof result.text !== 'string' || !result.text.trim()) return translationJson({ code: 'no_speech' }, 422);
    if (result.text.trim().length > MAX_TRANSLATION_LENGTH) return translationJson({ code: 'too_long' }, 422);
    return translationJson({ text: result.text.trim() });
  } catch (error) {
    const code = error instanceof Error && error.name === 'AbortError' ? 'timeout' : 'transcription_failed';
    return translationJson({ code }, code === 'timeout' ? 504 : 502);
  }
}
