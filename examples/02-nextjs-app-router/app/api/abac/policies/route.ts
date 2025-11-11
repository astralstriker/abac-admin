import { createPolicy, getAllPolicies } from "@/lib/policies-data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(getAllPolicies());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.id || !body.effect) {
      return NextResponse.json(
        { error: "Missing required fields: id, effect" },
        { status: 400 },
      );
    }

    const newPolicy = {
      id: body.id,
      version: body.version || "1.0.0",
      effect: body.effect,
      description: body.description,
      target: body.target,
      condition: body.condition,
      priority: body.priority,
      obligations: body.obligations,
      advice: body.advice,
      metadata: body.metadata || {
        createdAt: new Date(),
        createdBy: "api",
      },
    };

    const created = createPolicy(newPolicy);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Error creating policy:", error);
    return NextResponse.json(
      { error: "Failed to create policy" },
      { status: 500 },
    );
  }
}
