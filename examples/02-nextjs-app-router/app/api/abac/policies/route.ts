import { policies } from "@/lib/policies-data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(policies);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.policyId || !body.effect || !body.conditions) {
      return NextResponse.json(
        { error: "Missing required fields: policyId, effect, conditions" },
        { status: 400 },
      );
    }

    const newPolicy = {
      id: String(policies.length + 1),
      policyId: body.policyId,
      version: body.version || "1.0.0",
      effect: body.effect,
      description: body.description || "",
      conditions: body.conditions,
      isActive: body.isActive !== false,
      category: body.category || "default",
      tags: body.tags || [],
      createdBy: body.createdBy || "user",
      createdAt: new Date().toISOString(),
      updatedBy: null,
      updatedAt: new Date().toISOString(),
      deletedAt: null,
      deletedBy: null,
    };

    policies.push(newPolicy);
    return NextResponse.json(newPolicy, { status: 201 });
  } catch (error) {
    console.error("Error creating policy:", error);
    return NextResponse.json(
      { error: "Failed to create policy" },
      { status: 500 },
    );
  }
}
