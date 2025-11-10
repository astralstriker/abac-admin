# ABAC Admin Examples

Real-world examples demonstrating how to use the ABAC Admin packages in different scenarios and environments.

## 📚 Available Examples

### [01 - Vanilla Node.js](./01-vanilla-nodejs)
**Pure Node.js implementation using `@abac-admin/core`**

Learn the fundamentals without any framework overhead. Perfect for:
- CLI tools and scripts
- Background jobs
- Lambda/serverless functions
- Testing and automation
- Migration scripts

**Examples included:**
- ✅ Basic CRUD operations
- ✅ Advanced condition building
- ✅ Attribute management
- ✅ Audit log queries
- ✅ Batch operations
- ✅ Complete end-to-end workflow

### [02 - Next.js App Router](./02-nextjs-app-router)
**Modern Next.js 14+ with App Router using `@abac-admin/react` and `@abac-admin/nextjs`**

Full-stack Next.js integration with:
- Server Components and Server Actions
- React hooks for client-side management
- API route handlers
- Streaming and suspense
- Type-safe policy management UI

### [03 - Express API](./03-express-api)
**RESTful API server using Express and `@abac-admin/core`**

Build a complete ABAC policy management API:
- REST endpoints for policies, attributes, and audit
- Middleware for authentication
- Request validation
- Error handling
- OpenAPI/Swagger documentation

### [04 - Document Management System](./04-document-management)
**Real-world document management with hierarchical access control**

Complete implementation showing:
- User roles and departments
- Document classification levels
- Owner-based permissions
- Department-level access
- Time-based restrictions
- Multi-tenant isolation

### [05 - Multi-Tenant SaaS](./05-multi-tenant-saas)
**Enterprise SaaS application with tenant isolation**

Production-ready example with:
- Tenant isolation and data segregation
- Role-based access within tenants
- Organization hierarchies
- Custom permissions per tenant
- Subscription tier enforcement

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (for native fetch support)
- npm, yarn, or pnpm
- Basic understanding of ABAC concepts

### Installation

Each example is self-contained. Navigate to the example directory and install dependencies:

```bash
cd examples/01-vanilla-nodejs
npm install
```

### Running Examples

Each example includes its own README with specific instructions. Generally:

```bash
# Vanilla Node.js
cd 01-vanilla-nodejs
npm run workflow

# Next.js
cd 02-nextjs-app-router
npm run dev

# Express API
cd 03-express-api
npm start
```

## 📖 Learning Path

We recommend exploring the examples in this order:

1. **Start with Vanilla Node.js** - Learn the core concepts without framework complexity
2. **Next.js App Router** - See how to integrate with a modern React framework
3. **Express API** - Build backend services with ABAC
4. **Document Management** - Understand real-world access control patterns
5. **Multi-Tenant SaaS** - Implement enterprise-grade isolation and security

## 🎯 Use Cases by Example

### Vanilla Node.js
- Build CLI tools for policy management
- Create migration scripts
- Automate policy deployments
- Write integration tests
- Background job processing

### Next.js App Router
- Admin dashboards
- Policy management interfaces
- User-facing access control UI
- Real-time policy testing
- Audit log viewers

### Express API
- Microservices architecture
- Backend-for-frontend (BFF) pattern
- Third-party integrations
- Mobile app backends
- Webhook handlers

### Document Management
- Enterprise document systems
- File sharing platforms
- Knowledge bases
- Collaborative workspaces
- Content management systems

### Multi-Tenant SaaS
- B2B SaaS platforms
- White-label applications
- Enterprise software
- Marketplace platforms
- Agency management tools

## 🔧 Configuration

All examples support environment variables for configuration:

```bash
# API Configuration
ABAC_API_URL=http://localhost:3000/api/abac
ABAC_API_TOKEN=your-secret-token

# Database (if applicable)
DATABASE_URL=postgresql://user:pass@localhost:5432/abac

# Environment
NODE_ENV=development
```

Create a `.env` file in each example directory (see `.env.example` files).

## 📝 Common Patterns

### Client Initialization

```javascript
import { ABACAdminClient } from '@abac-admin/core';

const client = new ABACAdminClient({
  baseURL: process.env.ABAC_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.ABAC_API_TOKEN}`
  }
});
```

### Building Conditions

```javascript
import { ConditionBuilder } from '@abac-admin/core';

const condition = ConditionBuilder.and(
  ConditionBuilder.equals(
    ConditionBuilder.attr('subject', 'role'),
    'admin'
  ),
  ConditionBuilder.gte(
    ConditionBuilder.attr('subject', 'level'),
    5
  )
);
```

### React Hook Usage

```tsx
import { usePolicies } from '@abac-admin/react';

function PolicyList() {
  const { policies, createPolicy, isLoading } = usePolicies();

  // Your UI code here
}
```

## 🧪 Testing

Each example includes tests demonstrating:
- Unit testing with Vitest
- Integration testing
- E2E testing (where applicable)
- Mocking strategies

Run tests in any example:

```bash
npm test
```

## 🤝 Contributing Examples

We welcome new examples! Guidelines:

1. **Self-contained** - Each example should work independently
2. **Well-documented** - Include a comprehensive README
3. **Real-world** - Show practical, production-ready patterns
4. **TypeScript** - Use TypeScript for type safety
5. **Tested** - Include relevant tests

### Example Structure

```
examples/
└── your-example/
    ├── README.md           # Detailed documentation
    ├── package.json        # Dependencies and scripts
    ├── .env.example        # Environment template
    ├── src/                # Source code
    ├── tests/              # Test files
    └── docs/               # Additional documentation
```

## 📚 Additional Resources

- [Core Package Documentation](../packages/core/README.md)
- [React Package Documentation](../packages/react/README.md)
- [Next.js Package Documentation](../packages/nextjs/README.md)
- [Getting Started Guide](../GETTING_STARTED.md)
- [Architecture Overview](../ABAC_ENGINE_UI.md)

## 💡 Tips & Best Practices

### Performance
- Use `bulkSetAttributes()` instead of multiple `setResourceAttribute()` calls
- Implement caching for frequently accessed policies
- Consider pagination for large result sets

### Security
- Never hardcode API tokens
- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Validate all inputs before processing

### Maintainability
- Keep conditions simple and readable
- Use consistent naming conventions
- Document complex policy logic
- Version your policies appropriately

### Testing
- Test both PERMIT and DENY scenarios
- Include edge cases in tests
- Use realistic test data
- Automate policy validation

## 🐛 Troubleshooting

### Common Issues

**Q: "fetch is not defined"**
A: Ensure you're using Node.js 18+ which includes native fetch support.

**Q: "Cannot find module '@abac-admin/core'"**
A: Run `npm install` in the example directory.

**Q: "API connection refused"**
A: Check that your ABAC_API_URL is correct and the server is running.

**Q: "Zod validation error"**
A: Ensure all required fields are provided and match the schema.

### Getting Help

- Check the [main documentation](../README.md)
- Review [API reference](../docs/api-reference.md)
- Search [GitHub issues](https://github.com/astralstriker/abac-admin/issues)
- Join our [Discord community](https://discord.gg/abac-admin)

## 📄 License

All examples are licensed under MIT, same as the main project.

---

**Need a specific example?** [Open an issue](https://github.com/astralstriker/abac-admin/issues/new) and let us know!
