import {
  ABACEngine,
  AttributeRef,
  CombiningAlgorithm,
  ConditionBuilder,
  Decision,
  PolicyBuilder,
} from "abac-engine";
import { NextResponse } from "next/server";

// Initialize ABAC Engine
const engine = new ABACEngine({
  combiningAlgorithm: CombiningAlgorithm.DenyOverrides,
});

// Helper function to convert our policy format to abac-engine format
function convertToAbacEnginePolicy(policy: any) {
  const builder = PolicyBuilder.create(policy.policyId)
    .version(policy.version)
    .description(policy.description);

  // Set effect
  if (policy.effect === "PERMIT") {
    builder.permit();
  } else {
    builder.deny();
  }

  // Convert conditions recursively
  function buildCondition(condition: any): any {
    switch (condition.type) {
      case "equals":
        return ConditionBuilder.equals(
          parseAttributeRef(condition.left),
          condition.right,
        );
      case "notEquals":
        return ConditionBuilder.notEquals(
          parseAttributeRef(condition.left),
          condition.right,
        );
      case "in":
        return ConditionBuilder.in(
          parseAttributeRef(condition.left),
          condition.right,
        );
      case "notIn":
        // notIn is not supported by abac-engine, use not(in(...))
        return ConditionBuilder.in(
          parseAttributeRef(condition.left),
          condition.right,
        ).not();
      case "gt":
        return ConditionBuilder.greaterThan(
          parseAttributeRef(condition.left),
          condition.right,
        );
      case "gte":
        return ConditionBuilder.greaterThanOrEqual(
          parseAttributeRef(condition.left),
          condition.right,
        );
      case "lt":
        return ConditionBuilder.lessThan(
          parseAttributeRef(condition.left),
          condition.right,
        );
      case "lte":
        return ConditionBuilder.lessThanOrEqual(
          parseAttributeRef(condition.left),
          condition.right,
        );
      case "contains":
        return ConditionBuilder.contains(
          parseAttributeRef(condition.left),
          condition.right,
        );
      case "startsWith":
      case "endsWith":
      case "matches":
        // These operators may not be supported, fall back to equals
        console.warn(
          `Operator ${condition.type} not supported, falling back to equals`,
        );
        return ConditionBuilder.equals(
          parseAttributeRef(condition.left),
          condition.right,
        );
      case "and": {
        const conditions = (condition.conditions || []).map(buildCondition);
        if (conditions.length === 0) {
          return ConditionBuilder.equals(true, true);
        }
        let result = conditions[0];
        for (let i = 1; i < conditions.length; i++) {
          result = result.and(conditions[i]);
        }
        return result;
      }
      case "or": {
        const conditions = (condition.conditions || []).map(buildCondition);
        if (conditions.length === 0) {
          return ConditionBuilder.equals(true, true);
        }
        let result = conditions[0];
        for (let i = 1; i < conditions.length; i++) {
          result = result.or(conditions[i]);
        }
        return result;
      }
      case "not":
        return buildCondition(condition.conditions?.[0]).not();
      default:
        return ConditionBuilder.equals(
          parseAttributeRef(condition.left),
          condition.right,
        );
    }
  }

  function parseAttributeRef(ref: string): any {
    if (typeof ref !== "string") {
      return ref;
    }

    const parts = ref.split(".");
    if (parts.length < 2) {
      return ref;
    }

    const [category, ...rest] = parts;
    const key = rest.join(".");

    switch (category) {
      case "subject":
        return AttributeRef.subject(key);
      case "resource":
        return AttributeRef.resource(key);
      case "action":
        return AttributeRef.action(key);
      case "environment":
        return AttributeRef.environment(key);
      default:
        return ref;
    }
  }

  // Add condition
  if (policy.conditions) {
    builder.condition(buildCondition(policy.conditions));
  }

  return builder.build();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Support both formats: { policies, context } and { subject, resource, action, environment }
    let subject, resource, action, environment, policies;

    if (body.context) {
      // New format: { policies, context }
      subject = body.context.subject;
      resource = body.context.resource;
      action = body.context.action;
      environment = body.context.environment;
      policies = body.policies || [];
    } else {
      // Old format: { subject, resource, action, environment }
      subject = body.subject;
      resource = body.resource;
      action = body.action;
      environment = body.environment;
      policies = [];
    }

    if (!subject || !action) {
      return NextResponse.json(
        { error: "subject and action are required" },
        { status: 400 },
      );
    }

    // Convert policies to abac-engine format
    const enginePolicies = policies.map(convertToAbacEnginePolicy);

    if (enginePolicies.length === 0) {
      return NextResponse.json(
        { error: "At least one policy is required" },
        { status: 400 },
      );
    }

    // Create authorization request
    const authRequest = {
      subject: {
        id: subject.id || "unknown",
        attributes: subject,
      },
      resource: {
        id: resource?.id || "unknown",
        type: resource?.type || "resource",
        attributes: resource || {},
      },
      action: {
        id: typeof action === "string" ? action : action.id || action,
      },
      environment: environment || {},
    };

    // Evaluate the policy
    const decision = await engine.evaluate(authRequest, enginePolicies);

    return NextResponse.json({
      decision: decision.decision === Decision.Permit ? "PERMIT" : "DENY",
      matchedPolicies: policies.map((p: any) => p.policyId),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error evaluating policy:", error);
    return NextResponse.json(
      {
        error: "Failed to evaluate policy",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
