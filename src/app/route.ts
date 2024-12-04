import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { handleApiKeyValidation } from '@/components/handlers/apiKeyHandler';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Handle GET requests to the root path
export async function GET() {
  // Redirect to dashboard
  return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}

// Handle POST requests for API key validation
export async function POST(request: Request) {
  return handleApiKeyValidation(request);
} 