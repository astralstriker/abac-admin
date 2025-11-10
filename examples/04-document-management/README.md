# Document Management System Example

This example demonstrates a complete document management system with sophisticated ABAC-based access control. It shows real-world patterns for managing documents with hierarchical permissions, department isolation, and classification levels.

## Overview

This example implements a production-ready document management system with:

- 📁 **Hierarchical Access Control** - Manager can access subordinate documents
- 🏢 **Department Isolation** - Users see only their department's documents
- 🔒 **Classification Levels** - Public, Internal, Confidential, Highly Confidential
- 👤 **Owner Permissions** - Document owners have full control
- ⏰ **Time-Based Access** - Business hours restrictions
- 🔍 **Granular Permissions** - Read, Write, Delete, Share operations
- 📊 **Audit Trail** - Complete history of all access and changes

## Features

### User Management
- Role-based permissions (Admin, Manager, Developer, Designer, etc.)
- Department assignment
- Level-based hierarchy
- Status tracking (Active, Suspended, etc.)

### Document Management
- Create, read, update, delete documents
- Document classification levels
- Owner assignment
- Department categorization
- Version control
- Tag-based organization

### Access Control Policies
1. **Public Document Access** - Anyone can read public documents
2. **Owner Full Access** - Owners have complete control
3. **Department Access** - Team members can read internal department docs
4. **Admin Override** - Admins can access everything
5. **Manager Subordinate Access** - Managers can read team documents
6. **Classification Restrictions** - Highly confidential docs require admin role
7. **Business Hours Policy** - Time-based access restrictions
8. **Cross-Department Denial** - Prevent unauthorized department access

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```env
# ABAC API Configuration
ABAC_API_URL=http://localhost:3000/api/abac
ABAC_API_TOKEN=your-secret-token

# Database (optional)
DATABASE_URL=postgresql://user:pass@localhost:5432/docmgmt

# Storage (optional)
STORAGE_PROVIDER=s3
AWS_BUCKET=my-documents
AWS_REGION=us-east-1
```

## Running the Example

```bash
# Initialize the system with demo data
npm run init

# Start the application
npm start

# Run scenarios
npm run scenario:basic
npm run scenario:advanced
npm run scenario:multi-user

# Test access policies
npm run test:policies

# View audit logs
npm run audit:view
```

## Project Structure

```
04-document-management/
├── src/
│   ├── setup/
│   │   ├── users.js          # User setup and attributes
│   │   ├── documents.js      # Document setup and attributes
│   │   └── policies.js       # Policy definitions
│   ├── scenarios/
│   │   ├── basic-access.js   # Basic read/write scenarios
│   │   ├── hierarchy.js      # Manager-subordinate scenarios
│   │   ├── classification.js # Classification level tests
│   │   └── time-based.js     # Business hours scenarios
│   ├── services/
│   │   ├── document-service.js
│   │   ├── user-service.js
│   │   └── access-control.js
│   └── utils/
│       ├── policy-builder.js
│       └── helpers.js
├── tests/
│   ├── access-control.test.js
│   └── policies.test.js
└── docs/
    ├── POLICIES.md           # Policy documentation
    └── ARCHITECTURE.md       # System architecture
```

## Example Usage

### Initialize System

```javascript
import { setupUsers, setupDocuments, setupPolicies } from './src/setup/index.js';

// Create users with roles and departments
await setupUsers();

// Create documents with classifications
await setupDocuments();

// Set up access control policies
await setupPolicies();

console.log('✅ Document management system initialized!');
```

### Create a Document

```javascript
import { DocumentService } from './src/services/document-service.js';

const docService = new DocumentService(client);

const document = await docService.create({
  title: 'Q1 2024 Strategy',
  content: 'Strategic planning document...',
  ownerId: 'user-alice',
  department: 'engineering',
  classification: 'confidential',
  tags: ['strategy', 'planning', 'q1']
});
```

### Test Access

```javascript
import { AccessControlService } from './src/services/access-control.js';

const acService = new AccessControlService(client);

// Can Bob (manager) read Alice's document?
const result = await acService.checkAccess({
  userId: 'user-bob',
  documentId: 'doc-strategy',
  action: 'read'
});

console.log(`Access: ${result.allowed ? 'GRANTED' : 'DENIED'}`);
console.log(`Reason: ${result.reason}`);
```

## Scenarios

### Scenario 1: Basic Department Access

```javascript
// Alice (Engineering) creates a confidential document
const doc = await createDocument({
  owner: 'user-alice',
  department: 'engineering',
  classification: 'confidential'
});

// Bob (Engineering Manager) can read it - ✅ PERMIT
// Charlie (Engineering Dev) can read it - ✅ PERMIT
// Diana (Design) cannot read it - ❌ DENY
```

### Scenario 2: Hierarchical Access

```javascript
// Charlie (Developer, Level 4) creates a document
const doc = await createDocument({
  owner: 'user-charlie',
  ownerLevel: 4,
  department: 'engineering'
});

// Bob (Manager, Level 7) can access it - ✅ PERMIT (higher level)
// Eve (Developer, Level 3) cannot access it - ❌ DENY (same role, lower level)
```

### Scenario 3: Classification Protection

```javascript
// Create highly confidential HR document
const salaryDoc = await createDocument({
  title: 'Salary Information',
  classification: 'highly-confidential',
  department: 'hr'
});

// Alice (Admin) can access - ✅ PERMIT
// Bob (Manager) cannot access - ❌ DENY
// HR Department head cannot access - ❌ DENY (only admins)
```

### Scenario 4: Time-Based Access

```javascript
// Regular employee trying to access during off-hours
const result = await checkAccess({
  userId: 'user-charlie',
  documentId: 'doc-internal',
  action: 'read',
  time: '2024-01-15T22:00:00Z' // 10 PM
});

// Result: DENY - Outside business hours
// Managers and Admins are exempt from time restrictions
```

### Scenario 5: Document Sharing

```javascript
// Alice shares her document with Diana
await docService.share({
  documentId: 'doc-project-plan',
  fromUserId: 'user-alice',
  toUserId: 'user-diana',
  permissions: ['read']
});

// Diana can now read the document even though it's in Engineering department
// Share permissions override department restrictions
```

## Policy Definitions

### 1. Public Document Policy

```javascript
{
  policyId: 'allow-public-documents',
  effect: 'PERMIT',
  conditions: {
    type: 'and',
    conditions: [
      { type: 'equals', left: { category: 'resource', key: 'visibility' }, right: 'public' },
      { type: 'equals', left: { category: 'action', key: 'type' }, right: 'read' }
    ]
  }
}
```

### 2. Owner Full Access Policy

```javascript
{
  policyId: 'allow-owner-full-access',
  effect: 'PERMIT',
  conditions: {
    type: 'and',
    conditions: [
      {
        type: 'equals',
        left: { category: 'subject', key: 'userId' },
        right: { category: 'resource', key: 'ownerId' }
      },
      {
        type: 'in',
        left: { category: 'action', key: 'type' },
        right: ['read', 'update', 'delete', 'share']
      }
    ]
  }
}
```

### 3. Manager Hierarchy Policy

```javascript
{
  policyId: 'allow-manager-subordinate-access',
  effect: 'PERMIT',
  conditions: {
    type: 'and',
    conditions: [
      { type: 'equals', left: { category: 'subject', key: 'role' }, right: 'manager' },
      {
        type: 'equals',
        left: { category: 'subject', key: 'department' },
        right: { category: 'resource', key: 'department' }
      },
      {
        type: 'lt',
        left: { category: 'resource', key: 'ownerLevel' },
        right: { category: 'subject', key: 'level' }
      }
    ]
  }
}
```

### 4. Classification Restriction Policy

```javascript
{
  policyId: 'deny-highly-confidential',
  effect: 'DENY',
  conditions: {
    type: 'and',
    conditions: [
      {
        type: 'equals',
        left: { category: 'resource', key: 'classification' },
        right: 'highly-confidential'
      },
      {
        type: 'notEquals',
        left: { category: 'subject', key: 'role' },
        right: 'admin'
      }
    ]
  }
}
```

## Testing

### Run All Tests

```bash
npm test
```

### Test Specific Scenarios

```bash
# Test access control logic
npm run test:access

# Test policy evaluation
npm run test:policies

# Test user scenarios
npm run test:scenarios
```

### Example Test

```javascript
import { describe, it, expect } from 'vitest';
import { checkAccess } from './src/services/access-control.js';

describe('Document Access Control', () => {
  it('should allow department members to read internal documents', async () => {
    const result = await checkAccess({
      subject: {
        userId: 'user-bob',
        role: 'manager',
        department: 'engineering'
      },
      resource: {
        id: 'doc-001',
        visibility: 'internal',
        department: 'engineering'
      },
      action: { type: 'read' }
    });

    expect(result.decision).toBe('PERMIT');
  });

  it('should deny cross-department access to confidential documents', async () => {
    const result = await checkAccess({
      subject: {
        userId: 'user-diana',
        role: 'designer',
        department: 'design'
      },
      resource: {
        id: 'doc-001',
        classification: 'confidential',
        department: 'engineering'
      },
      action: { type: 'read' }
    });

    expect(result.decision).toBe('DENY');
  });
});
```

## Audit Trail

View complete audit logs:

```javascript
import { AuditService } from '@abac-admin/core';

const auditService = new AuditService(client);

// Get document access history
const history = await auditService.getEntityHistory('document', 'doc-001');

history.forEach(entry => {
  console.log(`${entry.timestamp}: ${entry.action} by ${entry.userId}`);
  console.log(`  Decision: ${entry.details.decision}`);
  console.log(`  Reason: ${entry.details.reason}`);
});
```

## Key Learnings

### 1. Policy Precedence
- DENY policies always take precedence over PERMIT
- Order matters when policies conflict
- Use explicit DENY for security-critical restrictions

### 2. Attribute Design
- Keep attributes granular and atomic
- Use consistent naming conventions
- Document attribute meanings and valid values

### 3. Performance Optimization
- Cache frequently accessed policies
- Batch attribute lookups
- Index commonly queried attributes

### 4. Security Best Practices
- Default to DENY unless explicitly permitted
- Audit all access attempts
- Regularly review and update policies
- Test edge cases thoroughly

## Common Patterns

### Pattern 1: Owner or Admin Access

```javascript
ConditionBuilder.or(
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'userId'),
    ConditionBuilder.attr('resource', 'ownerId')
  ),
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'role'),
    'admin'
  )
)
```

### Pattern 2: Same Department and Active User

```javascript
ConditionBuilder.and(
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'department'),
    ConditionBuilder.attr('resource', 'department')
  ),
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'status'),
    'active'
  )
)
```

### Pattern 3: Role-Based with Level Check

```javascript
ConditionBuilder.and(
  ConditionBuilder.in(
    ConditionBuilder.attr('subject', 'role'),
    ['manager', 'director']
  ),
  ConditionBuilder.gte(
    ConditionBuilder.attr('subject', 'level'),
    5
  )
)
```

## Production Considerations

### Scalability
- Implement caching layer (Redis)
- Use database indexes for attributes
- Consider policy compilation for performance
- Implement rate limiting

### Monitoring
- Track policy evaluation times
- Alert on frequent DENY decisions
- Monitor attribute update frequency
- Track audit log growth

### Maintenance
- Version control for policies
- Regular policy audits
- Automated policy testing
- Documentation of policy changes

## Troubleshooting

### Access Denied Unexpectedly
1. Check user attributes are set correctly
2. Verify document classification and department
3. Review applicable policies in order
4. Check for DENY policies that may override
5. Examine audit logs for detailed reasons

### Performance Issues
1. Enable policy caching
2. Optimize attribute lookups
3. Review complex condition structures
4. Consider pre-computing access lists

### Policy Conflicts
1. Review policy precedence rules
2. Check for overlapping conditions
3. Use explicit priority ordering
4. Test with comprehensive scenarios

## Next Steps

- Integrate with your authentication system
- Add document versioning
- Implement document workflows
- Add approval processes
- Create policy templates
- Build admin dashboard
- Add real-time notifications
- Implement document search

## Resources

- [Core Package Docs](../../packages/core/README.md)
- [Policy Best Practices](./docs/POLICIES.md)
- [System Architecture](./docs/ARCHITECTURE.md)
- [ABAC Concepts](../../docs/ABAC_CONCEPTS.md)

## License

MIT
