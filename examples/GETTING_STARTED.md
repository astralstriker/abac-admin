# Getting Started with ABAC Admin Examples

> **Your complete guide to learning and using the ABAC Admin packages through practical examples**

Welcome! This guide will help you quickly get up to speed with ABAC (Attribute-Based Access Control) using our comprehensive examples.

## 🎯 What You'll Learn

By working through these examples, you'll master:

- **Core Concepts**: Policies, attributes, conditions, and audit logging
- **Policy Building**: Create simple to complex access control rules
- **Framework Integration**: Use ABAC in Node.js, React, Next.js, and Express
- **Real-World Patterns**: Implement production-ready access control
- **Best Practices**: Security, performance, and maintainability

## 🚀 Quick Start (5 Minutes)

### Step 1: Prerequisites

Ensure you have:
- **Node.js 18+** (for native fetch support)
- **npm, yarn, or pnpm**
- **Basic JavaScript/TypeScript knowledge**

Check your Node version:
```bash
node --version  # Should be 18.0.0 or higher
```

### Step 2: Clone and Install

```bash
# Clone the repository
git clone https://github.com/astralstriker/abac-admin.git
cd abac-admin

# Install all dependencies (monorepo setup)
npm install

# Navigate to examples
cd examples/01-vanilla-nodejs
npm install
```

### Step 3: Run Your First Example

```bash
# Run the basic policies example
npm run basic
```

You should see output showing policy creation, updates, and deletions. Congratulations! 🎉

## 📚 Learning Path

### For Complete Beginners (Week 1-2)

Start here if you're new to ABAC or access control concepts.

#### Day 1-2: Core Concepts
```bash
cd examples/01-vanilla-nodejs
```

1. **Read the basics** - Review [basic-policies.js](./01-vanilla-nodejs/basic-policies.js)
   - Understand what a policy is
   - Learn about PERMIT and DENY effects
   - See CRUD operations in action

2. **Run and experiment**
   ```bash
   npm run basic
   ```
   - Modify policy descriptions
   - Change tags and categories
   - Try breaking things to learn error handling

#### Day 3-4: Building Conditions
```bash
npm run advanced
```

1. **Study [advanced-conditions.js](./01-vanilla-nodejs/advanced-conditions.js)**
   - Learn comparison operators (equals, gte, in, etc.)
   - Understand logical operators (AND, OR, NOT)
   - Build nested conditions

2. **Practice**: Create your own conditions
   ```javascript
   // Try this: Allow managers from engineering with level >= 5
   const condition = ConditionBuilder.and(
     ConditionBuilder.equals(
       ConditionBuilder.attr('subject', 'role'),
       'manager'
     ),
     ConditionBuilder.equals(
       ConditionBuilder.attr('subject', 'department'),
       'engineering'
     ),
     ConditionBuilder.gte(
       ConditionBuilder.attr('subject', 'level'),
       5
     )
   );
   ```

#### Day 5-6: Attributes
```bash
npm run attributes
```

1. **Explore [attribute-management.js](./01-vanilla-nodejs/attribute-management.js)**
   - Set and get attributes
   - Use bulk operations
   - Track attribute history

2. **Exercise**: Create a user profile system
   - Define user attributes (role, department, level)
   - Set attributes for 3 different users
   - Compare their attributes

#### Day 7: Complete Workflow
```bash
npm run workflow
```

1. **Study [complete-workflow.js](./01-vanilla-nodejs/complete-workflow.js)**
   - See how everything fits together
   - Understand a real document management scenario
   - Review the full policy lifecycle

### For Experienced Developers (Week 1)

Fast-track for developers familiar with authorization concepts.

#### Days 1-2: Core Package Mastery

1. **Quick review** of vanilla examples
   ```bash
   cd examples/01-vanilla-nodejs
   npm run all  # Runs all examples
   ```

2. **Deep dive** into [Document Management](./04-document-management/)
   - Study the policy architecture
   - Understand hierarchical access
   - Review classification levels

#### Days 3-4: Framework Integration

Choose your framework:

**Next.js/React Developers:**
```bash
cd examples/02-nextjs-app-router
npm install
npm run dev
```
- Build a policy management UI
- Implement real-time testing
- Create audit log viewers

**Backend/API Developers:**
```bash
cd examples/03-express-api
npm install
npm start
```
- Set up RESTful endpoints
- Implement middleware
- Add authentication

#### Days 5-7: Production Patterns

```bash
cd examples/05-multi-tenant-saas
```
- Study tenant isolation
- Implement organization hierarchies
- Add subscription enforcement

## 🎓 Learning by Use Case

### I Want to Build...

#### 1. A Document Management System

**Goal**: Control who can read, write, and delete documents

**Path**:
1. Start with [Document Management Example](./04-document-management/)
2. Learn these patterns:
   - Owner-based permissions
   - Department isolation
   - Classification levels (Public, Confidential, etc.)
   - Manager-subordinate access

**Key Files**:
- `src/setup/policies.js` - Policy definitions
- `src/scenarios/basic-access.js` - Access scenarios
- `src/scenarios/hierarchy.js` - Hierarchical access

#### 2. An Admin Dashboard

**Goal**: Web UI for managing policies

**Path**:
1. Review [Next.js App Router Example](./02-nextjs-app-router/)
2. Key components to study:
   - `components/policies/policy-list.tsx` - List policies
   - `components/policies/policy-form.tsx` - Create/edit policies
   - `components/policies/condition-builder.tsx` - Visual builder

**Run**:
```bash
cd examples/02-nextjs-app-router
npm run dev
```

#### 3. A REST API

**Goal**: Backend API for ABAC

**Path**:
1. Explore [Express API Example](./03-express-api/)
2. Implement:
   - `/api/policies` - Policy CRUD endpoints
   - `/api/attributes` - Attribute management
   - `/api/audit` - Audit log access

**Start**:
```bash
cd examples/03-express-api
npm start
```

#### 4. A Multi-Tenant SaaS Platform

**Goal**: Tenant isolation and custom permissions

**Path**:
1. Study [Multi-Tenant SaaS Example](./05-multi-tenant-saas/)
2. Implement:
   - Tenant data isolation
   - Organization hierarchies
   - Subscription tier enforcement

## 💡 Key Concepts Explained

### Policies

A **policy** is a rule that determines access. It consists of:

```javascript
{
  policyId: 'unique-identifier',
  version: '1.0.0',
  effect: 'PERMIT' | 'DENY',
  description: 'Human-readable description',
  conditions: { /* condition tree */ },
  isActive: true,
  category: 'grouping-category',
  tags: ['tag1', 'tag2']
}
```

**Example**: Allow admins to delete documents
```javascript
{
  policyId: 'allow-admin-delete',
  effect: 'PERMIT',
  conditions: {
    type: 'and',
    conditions: [
      { type: 'equals', left: { category: 'subject', key: 'role' }, right: 'admin' },
      { type: 'equals', left: { category: 'action', key: 'type' }, right: 'delete' }
    ]
  }
}
```

### Attributes

**Attributes** are properties of subjects, resources, actions, or environment:

```javascript
// Subject attributes (user properties)
{ userId: 'user-123', role: 'manager', department: 'engineering', level: 7 }

// Resource attributes (document properties)
{ documentId: 'doc-456', ownerId: 'user-123', classification: 'confidential' }

// Action attributes
{ type: 'read', timestamp: '2024-01-15T10:00:00Z' }

// Environment attributes
{ ipAddress: '192.168.1.1', currentHour: 14, dayOfWeek: 2 }
```

### Conditions

**Conditions** define the logic for when a policy applies:

#### Simple Condition
```javascript
// User role equals 'admin'
{
  type: 'equals',
  left: { category: 'subject', key: 'role' },
  right: 'admin'
}
```

#### Complex Condition
```javascript
// (Admin OR Manager) AND Level >= 5 AND Active
{
  type: 'and',
  conditions: [
    {
      type: 'or',
      conditions: [
        { type: 'equals', left: { category: 'subject', key: 'role' }, right: 'admin' },
        { type: 'equals', left: { category: 'subject', key: 'role' }, right: 'manager' }
      ]
    },
    { type: 'gte', left: { category: 'subject', key: 'level' }, right: 5 },
    { type: 'equals', left: { category: 'subject', key: 'status' }, right: 'active' }
  ]
}
```

### Audit Logs

**Audit logs** track all actions for compliance and monitoring:

```javascript
{
  timestamp: '2024-01-15T10:30:00Z',
  action: 'UPDATE',
  entityType: 'policy',
  entityId: 'policy-123',
  userId: 'user-456',
  details: {
    changes: { description: 'Updated description' },
    oldValue: 'Old description',
    newValue: 'Updated description'
  }
}
```

## 🔧 Common Patterns

### Pattern 1: Owner or Admin Access

**Use Case**: Document owner or admin can access

```javascript
ConditionBuilder.or(
  // Owner check
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'userId'),
    ConditionBuilder.attr('resource', 'ownerId')
  ),
  // Admin check
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'role'),
    'admin'
  )
)
```

### Pattern 2: Department Isolation

**Use Case**: Users can only access their department's resources

```javascript
ConditionBuilder.and(
  // Same department
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'department'),
    ConditionBuilder.attr('resource', 'department')
  ),
  // User is active
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'status'),
    'active'
  )
)
```

### Pattern 3: Time-Based Access

**Use Case**: Access only during business hours

```javascript
ConditionBuilder.and(
  // Hour between 9 AM and 5 PM
  ConditionBuilder.gte(
    ConditionBuilder.attr('environment', 'currentHour'),
    9
  ),
  ConditionBuilder.lte(
    ConditionBuilder.attr('environment', 'currentHour'),
    17
  ),
  // Weekday only
  ConditionBuilder.gte(
    ConditionBuilder.attr('environment', 'dayOfWeek'),
    1
  ),
  ConditionBuilder.lte(
    ConditionBuilder.attr('environment', 'dayOfWeek'),
    5
  )
)
```

### Pattern 4: Hierarchical Access

**Use Case**: Managers can access subordinate resources

```javascript
ConditionBuilder.and(
  // User is a manager
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'role'),
    'manager'
  ),
  // Same department
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'department'),
    ConditionBuilder.attr('resource', 'department')
  ),
  // Manager level is higher than resource owner level
  ConditionBuilder.lt(
    ConditionBuilder.attr('resource', 'ownerLevel'),
    ConditionBuilder.attr('subject', 'level')
  )
)
```

## 🧪 Testing Your Understanding

After each section, test yourself:

### Quiz 1: Basic Concepts

1. What's the difference between PERMIT and DENY policies?
2. What are the three main components of a policy?
3. How do you reference an attribute in a condition?

### Quiz 2: Conditions

Build conditions for these scenarios:

1. Allow users with role 'editor' to update documents
2. Allow admins OR managers to approve requests
3. Deny access to suspended users
4. Allow access only if user level >= 5 AND department is 'engineering'

### Quiz 3: Attributes

1. Set attributes for a user: role, department, level
2. Get all attributes for a resource
3. Compare attributes between two users
4. View attribute change history

**Check your answers** by running the examples and comparing your code!

## 🐛 Troubleshooting

### Common Issues

#### 1. "fetch is not defined"

**Problem**: Node.js version is too old

**Solution**:
```bash
node --version  # Must be 18+
nvm install 18  # If using nvm
nvm use 18
```

#### 2. "Cannot find module '@abac-admin/core'"

**Problem**: Dependencies not installed

**Solution**:
```bash
npm install
# or from the root of the monorepo
cd ../..
npm install
```

#### 3. "Connection refused" or "API error"

**Problem**: ABAC API URL not configured

**Solution**:
```bash
export ABAC_API_URL=http://localhost:3000/api/abac
export ABAC_API_TOKEN=your-token
```

Or create `.env` file:
```env
ABAC_API_URL=http://localhost:3000/api/abac
ABAC_API_TOKEN=your-token
```

#### 4. "Zod validation error"

**Problem**: Required fields missing or wrong type

**Solution**: Check the schema in error message, ensure all required fields are provided with correct types

## 📖 Next Steps

### After Completing Examples

1. **Review the main documentation**
   - [Core Package API](../packages/core/README.md)
   - [React Hooks API](../packages/react/README.md)
   - [Architecture Guide](../ABAC_ENGINE_UI.md)

2. **Build your own project**
   - Start with a simple use case
   - Copy patterns from examples
   - Adapt to your specific needs

3. **Join the community**
   - [GitHub Discussions](https://github.com/astralstriker/abac-admin/discussions)
   - [Discord](https://discord.gg/abac-admin)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/abac-admin)

4. **Contribute back**
   - Share your examples
   - Report bugs
   - Suggest improvements
   - Write documentation

## 🎯 Success Checklist

Mark these off as you complete them:

### Week 1
- [ ] Install Node.js 18+ and dependencies
- [ ] Run basic policies example successfully
- [ ] Understand policy structure (effect, conditions, etc.)
- [ ] Create a simple policy with one condition
- [ ] Run attribute management example
- [ ] Set and get attributes for a resource
- [ ] View audit logs

### Week 2
- [ ] Build complex conditions with AND/OR/NOT
- [ ] Use ConditionBuilder fluently
- [ ] Implement owner-based permissions
- [ ] Create department isolation policy
- [ ] Run complete workflow example
- [ ] Understand all core concepts

### Week 3
- [ ] Choose your framework (Next.js, Express, etc.)
- [ ] Set up development environment
- [ ] Build a simple UI or API
- [ ] Integrate ABAC into your project
- [ ] Test policies thoroughly

### Week 4
- [ ] Implement production-ready patterns
- [ ] Add comprehensive error handling
- [ ] Set up monitoring and logging
- [ ] Write tests for your policies
- [ ] Deploy to staging environment

## 💬 Getting Help

Stuck? Here's where to get help:

1. **Check the examples** - Most questions are answered in the code
2. **Read the docs** - [Full documentation](../README.md)
3. **Search issues** - [GitHub Issues](https://github.com/astralstriker/abac-admin/issues)
4. **Ask the community** - [Discussions](https://github.com/astralstriker/abac-admin/discussions)
5. **Join Discord** - [Discord Server](https://discord.gg/abac-admin)

## 🌟 Tips for Success

1. **Start Simple** - Don't try to build everything at once
2. **Read the Code** - Examples are heavily commented for learning
3. **Experiment** - Break things, fix them, learn from errors
4. **Test Thoroughly** - Always test both PERMIT and DENY cases
5. **Document** - Comment your policies explaining why they exist
6. **Ask Questions** - The community is here to help!

## 📚 Additional Resources

- [ABAC Concepts](https://en.wikipedia.org/wiki/Attribute-based_access_control)
- [Policy Design Best Practices](../docs/BEST_PRACTICES.md)
- [Security Guidelines](../docs/SECURITY.md)
- [Performance Optimization](../docs/PERFORMANCE.md)

---

**Ready to start?** Pick an example from the [Examples Index](./README.md) and dive in! 🚀

**Questions?** Open an issue or join our Discord community!

**Found this helpful?** Star the repo and share with others! ⭐
