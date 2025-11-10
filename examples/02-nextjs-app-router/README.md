# Next.js App Router Example

A complete working example demonstrating how to use `@devcraft-ts/abac-admin` packages with Next.js 14+ App Router and the `abac-engine` for real policy evaluation.

## Features

✅ **Policy Management UI** - View, create, and delete ABAC policies
✅ **Real ABAC Engine** - Uses `abac-engine` for actual policy evaluation
✅ **Next.js App Router** - Modern Next.js with React Server Components
✅ **API Routes** - RESTful API endpoints for policy management
✅ **Pre-built UI Components** - Uses `@devcraft-ts/abac-admin-react-ui`
✅ **Policy Evaluation** - Test policies with real-time evaluation

## Tech Stack

- **Next.js 14** - React framework with App Router
- **abac-engine** - Core ABAC policy evaluation engine
- **@devcraft-ts/abac-admin-react-ui** - Pre-built UI components
- **@devcraft-ts/abac-admin-react** - Headless React hooks
- **@devcraft-ts/abac-admin-core** - Framework-agnostic core
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
02-nextjs-app-router/
├── app/
│   ├── api/
│   │   └── abac/
│   │       ├── route.ts           # Policy CRUD endpoints
│   │       └── evaluate/
│   │           └── route.ts       # Policy evaluation endpoint
│   ├── policies/
│   │   └── page.tsx               # Policy management page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── package.json
├── next.config.js
└── tsconfig.json
```

## How It Works

### 1. Policy Management (UI)

The `/policies` page uses the pre-built `PolicyList` component from `@devcraft-ts/abac-admin-react-ui`:

```tsx
'use client'

import { ABACProvider, PolicyList } from '@devcraft-ts/abac-admin-react-ui'
import '@devcraft-ts/abac-admin-react-ui/styles.css'

export default function PoliciesPage() {
  return (
    <ABACProvider config={{ baseURL: '/api/abac' }}>
      <PolicyList 
        onCreate={() => alert('Create policy')}
        onEdit={(id) => alert(`Edit: ${id}`)}
        onDelete={(id) => alert(`Delete: ${id}`)}
      />
    </ABACProvider>
  )
}
```

### 2. Policy Storage & Evaluation (Backend)

The `/api/abac` endpoint manages policies and integrates with `abac-engine`:

```typescript
import { ABACEngine } from 'abac-engine'

const engine = new ABACEngine()

// Add policy to engine
engine.addPolicy({
  id: 'allow-read-docs',
  version: '1.0.0',
  effect: 'PERMIT',
  target: { 
    type: 'equals', 
    left: 'subject.role', 
    right: 'user' 
  },
})
```

### 3. Policy Evaluation

Test policies using the `/api/abac/evaluate` endpoint:

```bash
curl -X POST http://localhost:3000/api/abac/evaluate \
  -H "Content-Type: application/json" \
  -d '{
    "subject": { "role": "user" },
    "resource": { "type": "document" },
    "action": "read"
  }'
```

Response:
```json
{
  "decision": "PERMIT",
  "subject": { "role": "user" },
  "resource": { "type": "document" },
  "action": "read",
  "timestamp": "2024-11-10T10:00:00.000Z"
}
```

## API Endpoints

### GET /api/abac
List all policies

### POST /api/abac
Create a new policy

**Request body:**
```json
{
  "policyId": "my-policy",
  "version": "1.0.0",
  "effect": "PERMIT",
  "description": "Policy description",
  "conditions": {
    "type": "equals",
    "left": "subject.role",
    "right": "admin"
  },
  "isActive": true,
  "category": "security",
  "tags": ["admin"]
}
```

### DELETE /api/abac?id={policyId}
Delete a policy

### POST /api/abac/evaluate
Evaluate access decision

**Request body:**
```json
{
  "subject": { "role": "user", "id": "123" },
  "resource": { "type": "document", "owner": "456" },
  "action": "read",
  "environment": { "time": "2024-11-10T10:00:00Z" }
}
```

## Sample Policies

The example includes three pre-loaded policies:

1. **allow-read-docs** - Permits users to read documents
2. **allow-admin-all** - Permits admins to do everything
3. **deny-delete-critical** - Denies deletion of critical resources

## Customization

### Add Your Own Components

Replace the pre-built UI with custom components:

```tsx
'use client'

import { usePolicies } from '@devcraft-ts/abac-admin-react'

export default function CustomPolicyList() {
  const { policies, isLoading, createPolicy } = usePolicies()
  
  // Build your own UI
  return (
    <div>
      {policies.map(policy => (
        <div key={policy.id}>
          <h3>{policy.policyId}</h3>
          {/* Custom UI */}
        </div>
      ))}
    </div>
  )
}
```

### Integrate with Database

Replace in-memory storage with a database:

```typescript
// app/api/abac/route.ts
import { db } from '@/lib/db'

export async function GET() {
  const policies = await db.policy.findMany()
  return NextResponse.json(policies)
}
```

### Add Authentication

Protect routes with middleware:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  // Check authentication
  const token = request.headers.get('authorization')
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/abac/:path*',
}
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [abac-engine Documentation](https://github.com/astralstriker/abac-engine)
- [@devcraft-ts/abac-admin-react-ui](../../packages/react-ui/README.md)
- [@devcraft-ts/abac-admin-react](../../packages/react/README.md)

## License

MIT
