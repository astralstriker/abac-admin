import { Database, FileText, HardDrive, Save } from "lucide-react";
import Link from "next/link";

export default function PolicyPersistencePage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <Database className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Policy Persistence
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Policy Persistence
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Store and manage ABAC policies using various persistence mechanisms.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a
          href="#overview"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Overview
          </span>
        </a>
        <a
          href="#file-based"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <HardDrive className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            File-Based
          </span>
        </a>
        <a
          href="#database"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Database
          </span>
        </a>
        <a
          href="#dynamic"
          className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
        >
          <Save className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-medium text-gray-900 dark:text-white">
            Dynamic Loading
          </span>
        </a>
      </div>

      {/* Overview */}
      <section id="overview" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            abac-engine is designed to be flexible with policy storage and
            retrieval.
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            While the ABAC engine evaluates policies in-memory for optimal
            performance, you need a persistence layer to store and manage
            policies long-term. The engine is agnostic to how you store policies
            - you can use files, databases, or any custom solution.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
            Key Concepts
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>
              <strong>In-Memory Evaluation:</strong> Policies are evaluated from
              memory for speed
            </li>
            <li>
              <strong>Flexible Persistence:</strong> Store policies however you
              prefer
            </li>
            <li>
              <strong>Dynamic Loading:</strong> Load and reload policies at
              runtime
            </li>
            <li>
              <strong>Versioning:</strong> Track policy changes over time
            </li>
          </ul>
        </div>
      </section>

      {/* File-Based Persistence */}
      <section id="file-based" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            File-Based Persistence
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Store policies in JSON files for simple deployment and version
            control.
          </p>
        </div>

        <div className="space-y-6">
          {/* Single File */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Single Policy File
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Store all policies in a single JSON file.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// policies.json
{
  "policies": [
    {
      "id": "owner-access",
      "version": "1.0.0",
      "effect": "Permit",
      "description": "Owners can access their resources",
      "condition": {
        "operator": "equals",
        "left": { "category": "subject", "attributeId": "id" },
        "right": { "category": "resource", "attributeId": "ownerId" }
      }
    },
    {
      "id": "department-access",
      "version": "1.0.0",
      "effect": "Permit",
      "description": "Department members can read documents",
      "condition": {
        "operator": "and",
        "conditions": [
          {
            "operator": "equals",
            "left": { "category": "subject", "attributeId": "department" },
            "right": { "category": "resource", "attributeId": "department" }
          },
          {
            "operator": "in",
            "left": { "category": "action", "attributeId": "id" },
            "right": ["read", "view"]
          }
        ]
      }
    }
  ]
}`}
              </pre>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// load-policies.ts
import fs from 'fs/promises';
import { ABACEngine, ABACPolicy } from 'abac-engine';

async function loadPoliciesFromFile(filePath: string): Promise<ABACPolicy[]> {
  const content = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(content);
  return data.policies;
}

async function createEngine() {
  const policies = await loadPoliciesFromFile('./policies.json');
  return new ABACEngine({ policies });
}

// Usage
const engine = await createEngine();`}
              </pre>
            </div>
          </div>

          {/* Multiple Files */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Multiple Policy Files
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Organize policies into separate files by domain or category.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// File structure
policies/
  ├── documents/
  │   ├── owner-access.json
  │   ├── department-read.json
  │   └── confidential.json
  ├── users/
  │   ├── profile-access.json
  │   └── admin-access.json
  └── billing/
      └── billing-admin.json

// load-policies.ts
import fs from 'fs/promises';
import path from 'path';
import { ABACPolicy } from 'abac-engine';

async function loadPoliciesFromDirectory(dirPath: string): Promise<ABACPolicy[]> {
  const policies: ABACPolicy[] = [];

  async function readDirectory(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        await readDirectory(fullPath);
      } else if (entry.name.endsWith('.json')) {
        const content = await fs.readFile(fullPath, 'utf-8');
        const policy = JSON.parse(content);
        policies.push(policy);
      }
    }
  }

  await readDirectory(dirPath);
  return policies;
}

// Usage
const policies = await loadPoliciesFromDirectory('./policies');
const engine = new ABACEngine({ policies });`}
              </pre>
            </div>
          </div>

          {/* YAML Support */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              YAML Format
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use YAML for more readable policy definitions.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`# owner-access.yaml
id: owner-access
version: 1.0.0
effect: Permit
description: Owners can access their resources
condition:
  operator: equals
  left:
    category: subject
    attributeId: id
  right:
    category: resource
    attributeId: ownerId

# load-yaml-policies.ts
import fs from 'fs/promises';
import yaml from 'yaml';
import { ABACPolicy } from 'abac-engine';

async function loadPolicyFromYAML(filePath: string): Promise<ABACPolicy> {
  const content = await fs.readFile(filePath, 'utf-8');
  return yaml.parse(content);
}

const policy = await loadPolicyFromYAML('./owner-access.yaml');`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Database Persistence */}
      <section id="database" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Database Persistence
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Store policies in a database for dynamic management and versioning.
          </p>
        </div>

        <div className="space-y-6">
          {/* SQL Database */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              SQL Database (PostgreSQL, MySQL)
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`-- Schema
CREATE TABLE policies (
  id VARCHAR(255) PRIMARY KEY,
  version VARCHAR(50) NOT NULL,
  effect VARCHAR(10) NOT NULL CHECK (effect IN ('Permit', 'Deny')),
  description TEXT,
  condition JSONB NOT NULL,
  target JSONB,
  priority INTEGER DEFAULT 0,
  obligations JSONB,
  advice JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  metadata JSONB
);

CREATE INDEX idx_policies_active ON policies(is_active);
CREATE INDEX idx_policies_priority ON policies(priority DESC);

-- Version history table
CREATE TABLE policy_versions (
  id SERIAL PRIMARY KEY,
  policy_id VARCHAR(255) NOT NULL,
  version VARCHAR(50) NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255),
  FOREIGN KEY (policy_id) REFERENCES policies(id) ON DELETE CASCADE
);`}
              </pre>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// policy-repository.ts
import { Pool } from 'pg';
import { ABACPolicy } from 'abac-engine';

export class PolicyRepository {
  constructor(private pool: Pool) {}

  async loadPolicies(): Promise<ABACPolicy[]> {
    const result = await this.pool.query(
      'SELECT * FROM policies WHERE is_active = true ORDER BY priority DESC'
    );

    return result.rows.map(row => ({
      id: row.id,
      version: row.version,
      effect: row.effect,
      description: row.description,
      condition: row.condition,
      target: row.target,
      priority: row.priority,
      obligations: row.obligations,
      advice: row.advice,
      metadata: row.metadata
    }));
  }

  async savePolicy(policy: ABACPolicy, userId: string): Promise<void> {
    await this.pool.query(
      \`INSERT INTO policies
       (id, version, effect, description, condition, target, priority,
        obligations, advice, created_by, metadata)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (id) DO UPDATE SET
         version = EXCLUDED.version,
         effect = EXCLUDED.effect,
         description = EXCLUDED.description,
         condition = EXCLUDED.condition,
         target = EXCLUDED.target,
         priority = EXCLUDED.priority,
         obligations = EXCLUDED.obligations,
         advice = EXCLUDED.advice,
         updated_at = CURRENT_TIMESTAMP\`,
      [
        policy.id,
        policy.version,
        policy.effect,
        policy.description,
        JSON.stringify(policy.condition),
        JSON.stringify(policy.target),
        policy.priority || 0,
        JSON.stringify(policy.obligations),
        JSON.stringify(policy.advice),
        userId,
        JSON.stringify(policy.metadata)
      ]
    );

    // Save version history
    await this.pool.query(
      \`INSERT INTO policy_versions (policy_id, version, data, created_by)
       VALUES ($1, $2, $3, $4)\`,
      [policy.id, policy.version, JSON.stringify(policy), userId]
    );
  }

  async deletePolicy(policyId: string): Promise<void> {
    await this.pool.query('DELETE FROM policies WHERE id = $1', [policyId]);
  }

  async getPolicyVersions(policyId: string): Promise<ABACPolicy[]> {
    const result = await this.pool.query(
      'SELECT data FROM policy_versions WHERE policy_id = $1 ORDER BY created_at DESC',
      [policyId]
    );

    return result.rows.map(row => row.data);
  }
}

// Usage
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const repository = new PolicyRepository(pool);

const policies = await repository.loadPolicies();
const engine = new ABACEngine({ policies });`}
              </pre>
            </div>
          </div>

          {/* MongoDB */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              MongoDB / NoSQL
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// policy-service.ts
import { MongoClient, Collection } from 'mongodb';
import { ABACPolicy } from 'abac-engine';

export class PolicyService {
  private collection: Collection<ABACPolicy>;

  constructor(client: MongoClient) {
    const db = client.db('abac');
    this.collection = db.collection<ABACPolicy>('policies');

    // Create indexes
    this.collection.createIndex({ isActive: 1, priority: -1 });
    this.collection.createIndex({ 'metadata.category': 1 });
  }

  async loadActivePolicies(): Promise<ABACPolicy[]> {
    return await this.collection
      .find({ isActive: true })
      .sort({ priority: -1 })
      .toArray();
  }

  async savePolicy(policy: ABACPolicy): Promise<void> {
    await this.collection.updateOne(
      { id: policy.id },
      { $set: policy },
      { upsert: true }
    );
  }

  async deletePolicy(policyId: string): Promise<void> {
    await this.collection.deleteOne({ id: policyId });
  }

  async findPoliciesByCategory(category: string): Promise<ABACPolicy[]> {
    return await this.collection
      .find({ 'metadata.category': category, isActive: true })
      .toArray();
  }
}

// Usage
const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const service = new PolicyService(client);
const policies = await service.loadActivePolicies();
const engine = new ABACEngine({ policies });`}
              </pre>
            </div>
          </div>

          {/* Prisma ORM */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Using Prisma ORM
            </h3>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`// prisma/schema.prisma
model Policy {
  id          String   @id
  version     String
  effect      String
  description String?
  condition   Json
  target      Json?
  priority    Int      @default(0)
  obligations Json?
  advice      Json?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  createdBy   String?
  metadata    Json?

  versions    PolicyVersion[]

  @@index([isActive, priority])
}

model PolicyVersion {
  id        Int      @id @default(autoincrement())
  policyId  String
  version   String
  data      Json
  createdAt DateTime @default(now())
  createdBy String?

  policy    Policy   @relation(fields: [policyId], references: [id], onDelete: Cascade)

  @@index([policyId])
}

// policy-service.ts
import { PrismaClient } from '@prisma/client';
import { ABACPolicy } from 'abac-engine';

const prisma = new PrismaClient();

export async function loadPolicies(): Promise<ABACPolicy[]> {
  const policies = await prisma.policy.findMany({
    where: { isActive: true },
    orderBy: { priority: 'desc' }
  });

  return policies.map(p => ({
    id: p.id,
    version: p.version,
    effect: p.effect as 'Permit' | 'Deny',
    description: p.description || undefined,
    condition: p.condition as any,
    target: p.target as any,
    priority: p.priority,
    obligations: p.obligations as any,
    advice: p.advice as any,
    metadata: p.metadata as any
  }));
}

export async function savePolicy(policy: ABACPolicy, userId: string): Promise<void> {
  await prisma.$transaction(async (tx) => {
    await tx.policy.upsert({
      where: { id: policy.id },
      update: {
        version: policy.version,
        effect: policy.effect,
        description: policy.description,
        condition: policy.condition as any,
        target: policy.target as any,
        priority: policy.priority || 0,
        obligations: policy.obligations as any,
        advice: policy.advice as any,
        metadata: policy.metadata as any,
        updatedAt: new Date()
      },
      create: {
        id: policy.id,
        version: policy.version,
        effect: policy.effect,
        description: policy.description,
        condition: policy.condition as any,
        target: policy.target as any,
        priority: policy.priority || 0,
        obligations: policy.obligations as any,
        advice: policy.advice as any,
        createdBy: userId,
        metadata: policy.metadata as any
      }
    });

    await tx.policyVersion.create({
      data: {
        policyId: policy.id,
        version: policy.version,
        data: policy as any,
        createdBy: userId
      }
    });
  });
}

// Usage
const policies = await loadPolicies();
const engine = new ABACEngine({ policies });`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Loading */}
      <section id="dynamic" className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-blue-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dynamic Policy Loading
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Load and reload policies at runtime without restarting your
            application.
          </p>
        </div>

        <div className="space-y-6">
          {/* Hot Reload */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Hot Reload Policies
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically reload policies when they change in the database or
              file system.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { ABACEngine, ABACPolicy } from 'abac-engine';

export class PolicyManager {
  private engine: ABACEngine;
  private reloadInterval: NodeJS.Timeout | null = null;

  constructor(
    private loadPolicies: () => Promise<ABACPolicy[]>,
    private reloadIntervalMs: number = 60000 // 1 minute
  ) {
    this.engine = new ABACEngine({ policies: [] });
  }

  async initialize(): Promise<void> {
    await this.reload();
    this.startAutoReload();
  }

  async reload(): Promise<void> {
    const policies = await this.loadPolicies();
    this.engine = new ABACEngine({ policies });
    console.log(\`Loaded \${policies.length} policies\`);
  }

  startAutoReload(): void {
    if (this.reloadInterval) {
      clearInterval(this.reloadInterval);
    }

    this.reloadInterval = setInterval(async () => {
      try {
        await this.reload();
      } catch (error) {
        console.error('Failed to reload policies:', error);
      }
    }, this.reloadIntervalMs);
  }

  stopAutoReload(): void {
    if (this.reloadInterval) {
      clearInterval(this.reloadInterval);
      this.reloadInterval = null;
    }
  }

  getEngine(): ABACEngine {
    return this.engine;
  }

  async evaluate(request: any) {
    return this.engine.evaluate(request);
  }
}

// Usage
const manager = new PolicyManager(
  async () => await repository.loadPolicies(),
  60000 // Reload every minute
);

await manager.initialize();

// Use the manager for evaluation
const decision = await manager.evaluate(request);

// Manual reload
await manager.reload();`}
              </pre>
            </div>
          </div>

          {/* Cache with TTL */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Policy Cache with TTL
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cache policies with automatic expiration and refresh.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { ABACEngine, ABACPolicy } from 'abac-engine';

export class CachedPolicyLoader {
  private engine: ABACEngine | null = null;
  private lastLoad: number = 0;

  constructor(
    private loadPolicies: () => Promise<ABACPolicy[]>,
    private ttlMs: number = 300000 // 5 minutes
  ) {}

  async getEngine(): Promise<ABACEngine> {
    const now = Date.now();

    if (!this.engine || now - this.lastLoad > this.ttlMs) {
      const policies = await this.loadPolicies();
      this.engine = new ABACEngine({ policies });
      this.lastLoad = now;
    }

    return this.engine;
  }

  async evaluate(request: any) {
    const engine = await this.getEngine();
    return engine.evaluate(request);
  }

  invalidate(): void {
    this.engine = null;
    this.lastLoad = 0;
  }
}

// Usage
const loader = new CachedPolicyLoader(
  async () => await repository.loadPolicies(),
  300000 // 5 minute TTL
);

const decision = await loader.evaluate(request);

// Force refresh
loader.invalidate();`}
              </pre>
            </div>
          </div>

          {/* Event-Driven Updates */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Event-Driven Policy Updates
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use events to trigger policy reloads when changes occur.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 overflow-x-auto">
              <pre className="text-gray-300 font-mono text-sm">
                {`import { EventEmitter } from 'events';
import { ABACEngine, ABACPolicy } from 'abac-engine';

export class EventDrivenPolicyManager extends EventEmitter {
  private engine: ABACEngine;

  constructor(initialPolicies: ABACPolicy[] = []) {
    super();
    this.engine = new ABACEngine({ policies: initialPolicies });
  }

  async updatePolicies(policies: ABACPolicy[]): Promise<void> {
    this.engine = new ABACEngine({ policies });
    this.emit('policies-updated', policies.length);
  }

  async addPolicy(policy: ABACPolicy): Promise<void> {
    // Load current policies, add new one, recreate engine
    const currentPolicies = this.engine['policies']; // Access private field
    const updatedPolicies = [...currentPolicies, policy];
    await this.updatePolicies(updatedPolicies);
    this.emit('policy-added', policy.id);
  }

  async removePolicy(policyId: string): Promise<void> {
    const currentPolicies = this.engine['policies'];
    const updatedPolicies = currentPolicies.filter(p => p.id !== policyId);
    await this.updatePolicies(updatedPolicies);
    this.emit('policy-removed', policyId);
  }

  getEngine(): ABACEngine {
    return this.engine;
  }
}

// Usage
const manager = new EventDrivenPolicyManager();

manager.on('policies-updated', (count) => {
  console.log(\`\${count} policies loaded\`);
});

manager.on('policy-added', (id) => {
  console.log(\`Policy \${id} added\`);
});

// API endpoint to update policies
app.post('/api/policies', async (req, res) => {
  const policy = req.body;
  await repository.savePolicy(policy);
  await manager.addPolicy(policy);
  res.json({ success: true });
});`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-6 scroll-mt-24">
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Best Practices
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Version Control Policies
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Store policy files in Git alongside your code. This provides
              version history, rollback capabilities, and change tracking.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Maintain Version History
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Keep a version history table/collection to track policy changes
              over time. This is crucial for auditing and debugging.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Use Graceful Reload
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              When reloading policies, validate them first and maintain the old
              engine if validation fails. Don&apos;t break running services.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Optimize Load Frequency
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Balance between freshness and performance. Don&apos;t reload too
              frequently in production - every 1-5 minutes is usually
              sufficient.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Index Your Queries
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              If using a database, create indexes on isActive, priority, and
              category fields for optimal query performance.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-600 p-6 rounded-r-lg">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">
              Backup Policies Regularly
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Always maintain backups of your policies. Consider automated daily
              backups to prevent data loss.
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-6">
        <div className="border-l-4 border-green-600 pl-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Next Steps
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            href="/docs/abac-engine/examples"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              View Examples
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore practical examples and use cases
            </p>
          </Link>

          <Link
            href="/docs/abac-admin"
            className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
          >
            <Database className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              ABAC Admin
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Use the admin UI for policy management
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
