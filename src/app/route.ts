import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Dashboard route
  if (pathname === '/dashboard') {
    return NextResponse.next();
  }

  // API Playground route
  if (pathname === '/playground') {
    return NextResponse.next();
  }

  // Protected API route
  if (pathname === '/api/protected' && request.method === 'POST') {
    try {
      const body = await request.json();
      const { apiKey } = body;

      // API key validation logic
      const isValid = apiKey && apiKey.length > 10;

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { message: 'Valid API key' },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }
  }

  // Default route (can be modified as needed)
  return NextResponse.next();
}

// Configure which routes should be handled by middleware
export const config = {
  matcher: [
    '/dashboard',
    '/playground',
    '/api/protected'
  ]
}; 