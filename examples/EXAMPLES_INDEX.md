# ABAC Admin Examples Index

> **Complete reference guide for all examples in this repository**

This document provides a comprehensive overview of all examples, their use cases, and how to choose the right one for your needs.

## 📚 Quick Navigation

| Example | Use Case | Complexity | Best For |
|---------|----------|------------|----------|
| [Vanilla Node.js](#1-vanilla-nodejs) | Core concepts, CLI tools, scripts | ⭐ Beginner | Learning fundamentals |
| [Next.js App Router](#2-nextjs-app-router) | Modern React apps, admin dashboards | ⭐⭐ Intermediate | Web applications |
| [Express API](#3-express-api) | RESTful APIs, microservices | ⭐⭐ Intermediate | Backend services |
| [Document Management](#4-document-management) | Real-world access control | ⭐⭐⭐ Advanced | Production patterns |
| [Multi-Tenant SaaS](#5-multi-tenant-saas) | Enterprise applications | ⭐⭐⭐⭐ Expert | B2B platforms |

## 🎯 Choose Your Example

### I want to...

#### Learn the Basics
→ Start with **[Vanilla Node.js](#1-vanilla-nodejs)**
- Pure JavaScript/TypeScript
- No framework complexity
- Focus on core concepts
- Step-by-step tutorials

#### Build a Web Application
→ Use **[Next.js App Router](#2-nextjs-app-router)**
- Modern React with Server Components
- Ready-to-use UI components
- Real-time updates
- Best for dashboards and admin interfaces

#### Create an API Backend
→ Choose **[Express API](#3-express-api)**
- RESTful endpoints
- Middleware patterns
- OpenAPI documentation
- Perfect for microservices

#### Implement Real Access Control
→ Study **[Document Management](#4-document-management)**
- Production-ready patterns
- Complex policy hierarchies
- Department isolation
- Classification levels

#### Build Enterprise SaaS
→ Explore **[Multi-Tenant SaaS](#5-multi-tenant-saas)**
- Tenant isolation
- Organization hierarchies
- Custom permissions
- Subscription enforcement

## 📖 Detailed Example Breakdown

### 1. Vanilla Node.js

**Path:** `examples/01-vanilla-nodejs/`

#### What's Inside

```
01-vanilla-nodejs/
├── basic-policies.js           # CRUD operations
├── advanced-conditions.js      # Complex condition building
├── attribute-management.js     # Attribute operations
├── audit-queries.js           # Audit log examples
├── batch-operations.js        # Bulk operations
└── complete-workflow.js       # End-to-end scenario
```

#### Key Concepts Covered

- ✅ Client initialization and configuration
- ✅ Policy CRUD operations (Create, Read, Update, Delete)
- ✅ Building simple and complex conditions
- ✅ Logical operators (AND, OR, NOT)
- ✅ Comparison operators (equals, gte, in, etc.)
- ✅ Attribute management (set, get, bulk operations)
- ✅ Audit log queries and filtering
- ✅ Batch operations for efficiency
- ✅ Error handling patterns
- ✅ Complete workflow integration

#### When to Use

- Learning ABAC concepts from scratch
- Building CLI tools for policy management
- Creating migration or deployment scripts
- Writing integration tests
- Implementing background jobs
- Serverless/Lambda functions

#### Running Examples

```bash
cd examples/01-vanilla-nodejs
npm install

# Run individual examples
npm run basic          # Basic CRUD
npm run advanced       # Advanced conditions
npm run attributes     # Attribute management
npm run workflow       # Complete workflow
```

#### What You'll Learn

1. **Foundation Skills**
   - How to initialize the ABAC client
   - Creating and managing policies
   - Building policy conditions programmatically

2. **Advanced Techniques**
   - Complex nested conditions
   - Attribute comparison across resources
   - Bulk operations for performance
   - Audit trail analysis

3. **Best Practices**
   - Error handling patterns
   - Type safety with TypeScript
   - Code organization
   - Testing strategies

---

### 2. Next.js App Router

**Path:** `examples/02-nextjs-app-router/`

#### What's Inside

```
02-nextjs-app-router/
├── app/
│   ├── api/abac/              # API route handlers
│   ├── policies/              # Policy management UI
│   ├── attributes/            # Attribute management UI
│   └── audit/                 # Audit log viewer
├── components/
│   ├── policies/              # Policy components
│   ├── attributes/            # Attribute components
│   └── ui/                    # Reusable UI components
└── lib/
    ├── abac-client.ts         # Client configuration
    └── server-actions.ts      # Server actions
```

#### Key Concepts Covered

- ✅ Server Components for data fetching
- ✅ Client Components with React hooks
- ✅ Server Actions for mutations
- ✅ API Route Handlers
- ✅ React Context for state management
- ✅ Real-time policy testing
- ✅ Visual condition builder
- ✅ Audit log visualization
- ✅ Responsive UI with Tailwind CSS
- ✅ Type-safe forms with Zod

#### When to Use

- Building admin dashboards
- Creating policy management interfaces
- Developing user-facing access control UI
- Real-time policy testing tools
- Audit log viewers and analytics
- Modern React applications

#### Running Examples

```bash
cd examples/02-nextjs-app-router
npm install
npm run dev
```

Open http://localhost:3000

#### Key Features

1. **Policy Management Dashboard**
   - List/filter/search policies
   - Visual condition builder
   - Real-time policy testing
   - Export/import capabilities

2. **Attribute Management Interface**
   - View/edit resource attributes
   - Bulk operations UI
   - Attribute history timeline
   - Visual comparison tool

3. **Audit Log Viewer**
   - Real-time log streaming
   - Advanced filtering
   - User activity tracking
   - Export functionality

---

### 3. Express API

**Path:** `examples/03-express-api/`

#### What's Inside

```
03-express-api/
├── src/
│   ├── routes/
│   │   ├── policies.js        # Policy endpoints
│   │   ├── attributes.js      # Attribute endpoints
│   │   └── audit.js           # Audit endpoints
│   ├── middleware/
│   │   ├── auth.js            # Authentication
│   │   └── validation.js      # Request validation
│   ├── controllers/           # Business logic
│   └── services/              # ABAC service layer
└── docs/
    └── openapi.yaml           # API documentation
```

#### Key Concepts Covered

- ✅ RESTful API design
- ✅ Express middleware patterns
- ✅ Request validation with Zod
- ✅ Error handling middleware
- ✅ Authentication/authorization
- ✅ OpenAPI documentation
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Logging and monitoring

#### When to Use

- Building microservices
- Creating backend APIs
- Implementing BFF (Backend-for-Frontend)
- Mobile app backends
- Third-party integrations
- Webhook handlers

#### API Endpoints

```
GET    /api/policies           # List policies
GET    /api/policies/:id       # Get policy
POST   /api/policies           # Create policy
PUT    /api/policies/:id       # Update policy
DELETE /api/policies/:id       # Delete policy
POST   /api/policies/test      # Test policy

GET    /api/attributes/:type/:id           # Get attributes
PUT    /api/attributes/:type/:id/:key      # Set attribute
DELETE /api/attributes/:type/:id/:key      # Delete attribute

GET    /api/audit              # Get audit logs
GET    /api/audit/stats        # Get statistics
```

---

### 4. Document Management System

**Path:** `examples/04-document-management/`

#### What's Inside

```
04-document-management/
├── src/
│   ├── setup/
│   │   ├── users.js           # User initialization
│   │   ├── documents.js       # Document setup
│   │   └── policies.js        # Policy definitions
│   ├── scenarios/
│   │   ├── basic-access.js    # Basic scenarios
│   │   ├── hierarchy.js       # Manager access
│   │   ├── classification.js  # Security levels
│   │   └── time-based.js      # Time restrictions
│   └── services/
│       ├── document-service.js
│       └── access-control.js
└── tests/
    └── access-control.test.js
```

#### Key Concepts Covered

- ✅ Hierarchical access control
- ✅ Department isolation
- ✅ Classification levels (Public, Internal, Confidential, Highly Confidential)
- ✅ Owner-based permissions
- ✅ Manager-subordinate relationships
- ✅ Time-based access restrictions
- ✅ Granular operation permissions (Read, Write, Delete, Share)
- ✅ Cross-department access policies
- ✅ Audit trail for compliance

#### Access Control Policies

1. **Public Document Access** - Anyone can read public docs
2. **Owner Full Access** - Owners control their documents
3. **Department Access** - Team members see internal docs
4. **Admin Override** - Admins access everything
5. **Manager Hierarchy** - Managers access subordinate docs
6. **Classification Protection** - Restrict highly confidential
7. **Business Hours** - Time-based restrictions
8. **Cross-Department Denial** - Prevent unauthorized access

#### Real-World Scenarios

```javascript
// Scenario 1: Department member accessing internal document
Subject: { role: 'developer', department: 'engineering' }
Resource: { classification: 'internal', department: 'engineering' }
Action: { type: 'read' }
Result: PERMIT ✅

// Scenario 2: Cross-department access to confidential document
Subject: { role: 'designer', department: 'design' }
Resource: { classification: 'confidential', department: 'engineering' }
Action: { type: 'read' }
Result: DENY ❌

// Scenario 3: Manager accessing subordinate document
Subject: { role: 'manager', level: 7, department: 'engineering' }
Resource: { ownerLevel: 4, department: 'engineering' }
Action: { type: 'read' }
Result: PERMIT ✅

// Scenario 4: Non-admin accessing highly confidential
Subject: { role: 'manager', department: 'engineering' }
Resource: { classification: 'highly-confidential' }
Action: { type: 'read' }
Result: DENY ❌ (Only admins allowed)
```

---

### 5. Multi-Tenant SaaS

**Path:** `examples/05-multi-tenant-saas/`

#### What's Inside

```
05-multi-tenant-saas/
├── src/
│   ├── tenants/
│   │   ├── isolation.js       # Tenant isolation
│   │   ├── hierarchy.js       # Org structure
│   │   └── permissions.js     # Custom permissions
│   ├── subscriptions/
│   │   ├── tiers.js           # Subscription tiers
│   │   └── enforcement.js     # Feature enforcement
│   ├── organizations/
│   │   └── hierarchy.js       # Org hierarchies
│   └── policies/
│       ├── tenant-policies.js # Tenant-specific
│       └── global-policies.js # Platform-wide
└── tests/
    └── tenant-isolation.test.js
```

#### Key Concepts Covered

- ✅ Tenant data isolation
- ✅ Organization hierarchies
- ✅ Role-based access within tenants
- ✅ Custom permissions per tenant
- ✅ Subscription tier enforcement
- ✅ Feature flags and access control
- ✅ Cross-tenant security
- ✅ Tenant-specific policy overrides
- ✅ Audit logs per tenant

#### Multi-Tenant Patterns

1. **Strict Tenant Isolation**
   ```javascript
   // Users can only access resources in their tenant
   ConditionBuilder.equals(
     ConditionBuilder.attr('subject', 'tenantId'),
     ConditionBuilder.attr('resource', 'tenantId')
   )
   ```

2. **Organization Hierarchy**
   ```javascript
   // Parent org members can access child org resources
   ConditionBuilder.contains(
     ConditionBuilder.attr('resource', 'orgPath'),
     ConditionBuilder.attr('subject', 'orgId')
   )
   ```

3. **Subscription Tier Enforcement**
   ```javascript
   // Feature available only for enterprise tier
   ConditionBuilder.in(
     ConditionBuilder.attr('subject', 'subscriptionTier'),
     ['enterprise', 'premium']
   )
   ```

---

## 🎓 Learning Paths

### Path 1: Complete Beginner

1. **Week 1: Fundamentals**
   - Read [Getting Started Guide](../GETTING_STARTED.md)
   - Complete [Vanilla Node.js - Basic Policies](./01-vanilla-nodejs/basic-policies.js)
   - Complete [Vanilla Node.js - Attribute Management](./01-vanilla-nodejs/attribute-management.js)

2. **Week 2: Advanced Concepts**
   - Complete [Vanilla Node.js - Advanced Conditions](./01-vanilla-nodejs/advanced-conditions.js)
   - Complete [Vanilla Node.js - Complete Workflow](./01-vanilla-nodejs/complete-workflow.js)
   - Study [Document Management System](./04-document-management/)

3. **Week 3: Framework Integration**
   - Explore [Next.js App Router](./02-nextjs-app-router/)
   - Build a simple policy management UI
   - Implement real-time policy testing

### Path 2: Experienced Developer

1. **Day 1: Quick Start**
   - Skim [Vanilla Node.js](./01-vanilla-nodejs/) basics
   - Deep dive into [Document Management](./04-document-management/)

2. **Day 2-3: Framework Integration**
   - Study [Next.js App Router](./02-nextjs-app-router/)
   - Review [Express API](./03-express-api/)
   - Choose framework for your use case

3. **Day 4-5: Production Patterns**
   - Explore [Multi-Tenant SaaS](./05-multi-tenant-saas/)
   - Implement your specific use case
   - Set up testing and monitoring

### Path 3: Enterprise Implementation

1. **Phase 1: Architecture (Week 1)**
   - Review all examples
   - Map to your requirements
   - Design policy hierarchy
   - Plan attribute schema

2. **Phase 2: Implementation (Weeks 2-4)**
   - Start with [Document Management](./04-document-management/) patterns
   - Adapt [Multi-Tenant SaaS](./05-multi-tenant-saas/) for your needs
   - Build custom policies
   - Implement audit logging

3. **Phase 3: Integration (Weeks 5-6)**
   - Integrate with auth system
   - Build admin interfaces
   - Set up monitoring
   - Train team

---

## 🔍 Finding the Right Pattern

### By Access Control Requirement

| Requirement | Example | Section |
|-------------|---------|---------|
| Owner permissions | Document Management | Owner Full Access Policy |
| Department isolation | Document Management | Department Access Policy |
| Role-based access | All Examples | Basic role checks |
| Hierarchical access | Document Management | Manager Hierarchy Policy |
| Time-based access | Document Management | Business Hours Policy |
| Classification levels | Document Management | Classification Protection |
| Tenant isolation | Multi-Tenant SaaS | Tenant Isolation |
| Organization hierarchy | Multi-Tenant SaaS | Org Hierarchy |
| Feature flags | Multi-Tenant SaaS | Subscription Enforcement |

### By Technology Stack

| Stack | Recommended Example |
|-------|-------------------|
| Node.js CLI | Vanilla Node.js |
| Next.js 14+ | Next.js App Router |
| React (any version) | Next.js App Router |
| Express.js | Express API |
| Microservices | Express API |
| Lambda/Serverless | Vanilla Node.js |
| Vue.js | Adapt React examples |
| Angular | Adapt React examples |

---

## 🧪 Testing Examples

All examples include comprehensive tests:

```bash
# Run tests for a specific example
cd examples/01-vanilla-nodejs
npm test

# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch
```

---

## 📊 Complexity Comparison

| Feature | Vanilla | Next.js | Express | DocMgmt | Multi-Tenant |
|---------|---------|---------|---------|---------|--------------|
| Setup Time | 5 min | 15 min | 15 min | 30 min | 45 min |
| Lines of Code | ~500 | ~2000 | ~1500 | ~3000 | ~4000 |
| Learning Curve | Easy | Medium | Medium | Hard | Expert |
| Production Ready | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| UI Included | ❌ | ✅ | ❌ | ❌ | ⚠️ |
| Tests Included | ⚠️ | ✅ | ✅ | ✅ | ✅ |

---

## 🚀 Quick Start Commands

```bash
# Clone the repository
git clone https://github.com/astralstriker/abac-admin.git
cd abac-admin

# Install dependencies for all examples
npm install

# Run a specific example
cd examples/01-vanilla-nodejs
npm install
npm run workflow

# Run all example tests
npm run test:examples
```

---

## 💡 Pro Tips

1. **Start Simple**: Begin with Vanilla Node.js even if you plan to use a framework
2. **Read the Code**: Examples are heavily commented - read them!
3. **Experiment**: Modify examples to match your use case
4. **Test Thoroughly**: Use provided tests as templates
5. **Check Audit Logs**: Always verify policies work as intended
6. **Version Control**: Keep policies in version control
7. **Document Decisions**: Comment why policies exist
8. **Monitor Performance**: Track policy evaluation times

---

## 📚 Additional Resources

- [Main Documentation](../README.md)
- [Getting Started Guide](../GETTING_STARTED.md)
- [Core Package API](../packages/core/README.md)
- [React Hooks API](../packages/react/README.md)
- [Next.js Utilities](../packages/nextjs/README.md)
- [Contributing Guide](../CONTRIBUTING.md)

---

## 🆘 Getting Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/astralstriker/abac-admin/issues)
- **Discussions**: [Ask questions and share ideas](https://github.com/astralstriker/abac-admin/discussions)
- **Discord**: [Join our community](https://discord.gg/abac-admin)
- **Documentation**: [Read the full docs](https://abac-admin.dev)

---

## 📄 License

All examples are MIT licensed. Feel free to use them in your projects!

---

**Ready to get started?** Pick an example above and dive in! 🚀
