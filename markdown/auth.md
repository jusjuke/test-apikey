# Google SSO Authentication Setup Guide

## 1. Installation
Install required packages:

```bash
npm install next-auth @auth/google-provider
# or
yarn add next-auth @auth/google-provider
```

## 2. Environment Variables
Add the following to `.env.local`:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_string_here
NEXTAUTH_URL=http://localhost:3000
```

## 3. NextAuth Configuration
Create authentication API route:

```typescript:src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import GoogleProvider from "@auth/google-provider"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
})

export { handler as GET, handler as POST }
```

## 4. Middleware Protection
Update middleware to protect routes:

```typescript:src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  if (!token) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/playground',
    '/api/protected',
    '/api/validate',
    '/api/github-summarizer'
  ]
}
```

## 5. SessionProvider Setup
Add SessionProvider to layout:

```typescript:src/app/layout.tsx
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SupabaseProvider>
          <SessionProvider>{children}</SessionProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
```

## 6. Login Button Implementation
Add Google login button to your page:

```javascript
import { signIn, useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <button
      className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
      onClick={handleGoogleLogin}
      aria-label="Sign in with Google"
    >
      <Image
        src="/google.svg"
        alt="Google logo"
        width={20}
        height={20}
        className="mr-2"
      />
      Sign in with Google
    </button>
  );
}

```

## 7. Google Cloud Console Setup
1. Create a new project in Google Cloud Console
2. Enable Google OAuth 2.0 API
3. Configure OAuth consent screen
4. Create OAuth 2.0 Client ID credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env.local` file

## 8. Required Assets
Add Google logo to your public folder:
- `/public/google.svg`

## Usage
- Users can click the "Sign in with Google" button to authenticate
- Protected routes will redirect to home page if user is not authenticated
- Session information is available through `useSession` hook