# API Key Protection System

This document describes the API key validation system implemented in the Next.js application.

## System Overview

The API key protection system consists of several components working together to provide secure API access:

1. Root Route Handler (`src/app/route.ts`)
2. API Key Validation Handler (`src/components/handlers/apiKeyHandler.ts`)
3. Protected API Routes (`src/app/api/protected/route.ts`, `src/app/api/github-summarizer/route.ts`)
4. Middleware Protection (`src/middleware.ts`)
5. Validation Endpoint (`src/app/api/validate/route.ts`)

## Components

### 1. Root Route Handler
- Located at: `src/app/route.ts`
- Handles root path requests
- GET: Redirects to dashboard
- POST: Validates API keys through the handler

```typescript
export async function GET() {
  return NextResponse.redirect(new URL('/dashboard', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}

export async function POST(request: Request) {
  return handleApiKeyValidation(request);
}
```

### 2. API Key Validation Handler
- Located at: `src/components/handlers/apiKeyHandler.ts`
- Implements the core validation logic
- Validates API keys against length requirement (minimum 10 characters)
- Returns appropriate JSON responses with status codes

### 3. Protected Routes
- GitHub Summarizer API (`/api/github-summarizer`)
- Protected API endpoint (`/api/protected`)
- Requires valid API key in headers
- Implements specific functionality with API key protection

### 4. Middleware Protection
- Located at: `src/middleware.ts`
- Protects specified routes:
  - /dashboard
  - /playground
  - /api/protected
  - /api/validate
  - /api/github-summarizer

### 5. Validation Endpoint
- Located at: `src/app/api/validate/route.ts`
- Dedicated endpoint for API key validation
- Returns validation status

## API Responses

### Successful Validation
```json
{
  "message": "Valid API key",
  "status": 200
}
```

### Failed Validation
```json
{
  "error": "Invalid API key",
  "status": 401
}
```

### Invalid Request
```json
{
  "error": "Invalid request",
  "status": 400
}
```

## Usage

1. Include API key in request headers:
```typescript
headers: {
  'api-key': 'your-api-key-here'
}
```

2. API key requirements:
   - Minimum length: 10 characters
   - Must be included in protected route requests

## Protected Routes
All routes specified in the middleware matcher are protected:
- Dashboard access
- Playground access
- Protected API endpoints
- API key validation endpoint
- GitHub README summarizer

## Implementation Notes
- Uses Next.js 14 App Router
- Implements runtime configuration for Node.js
- Uses dynamic routing for API endpoints
- Separates business logic from route handlers
- Implements proper error handling and status codes
