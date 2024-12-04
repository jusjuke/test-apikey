import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add your middleware logic here
  return NextResponse.next()
}

// Configure which routes should be handled by middleware
export const config = {
  matcher: [
    '/dashboard',
    '/playground',
    '/api/protected',
    '/api/validate',
    '/api/github-summarizer'
  ]
} 