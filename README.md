# Kumadai Tap & Speak Conversation Mode v1.1.2

Two-way communication cards for international students and Japanese staff.

## What changed in v1.1.2

- Added a reusable standardized footer component.
- Footer shows app name, creator, copyright, and About link.
- Footer supports optional LinkedIn, GitHub, and phone number props for future use.
- Added footer to the main app screen while keeping the existing `/about` page and More → About panel.

## Reusable footer

File:

```txt
src/components/AppFooter.tsx
```

Use it in any project:

```tsx
<AppFooter appName="Kumamoto Hello" />
<AppFooter appName="Kumamoto Gomi Guide" />
<AppFooter appName="Kumadai Tap & Speak" />
```

Optional future contact props:

```tsx
<AppFooter
  appName="Kumadai Tap & Speak"
  creatorName="Wayne Asera"
  linkedinUrl="https://www.linkedin.com/in/your-profile"
  githubUrl="https://github.com/your-username"
  phoneNumber="+81-xx-xxxx-xxxx"
/>
```

## Run

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Checks

```bash
npm run typecheck
npm run build
```

Both passed in this package.
