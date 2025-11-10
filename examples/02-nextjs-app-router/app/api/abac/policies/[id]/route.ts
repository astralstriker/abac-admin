import { policies } from "@/lib/policies-data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const policy = policies.find((p) => p.id === params.id);

  if (!policy) {
    return NextResponse.json({ error: "Policy not found" }, { status: 404 });
  }

  return NextResponse.json(policy);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const policyIndex = policies.findIndex((p) => p.id === params.id);

    if (policyIndex === -1) {
      return NextResponse.json({ error: "Policy not found" }, { status: 404 });
    }

    const updatedPolicy = {
      ...policies[policyIndex],
      ...body,
      id: params.id,
      updatedBy: body.updatedBy || "user",
      updatedAt: new Date().toISOString(),
    };

    policies[policyIndex] = updatedPolicy;
    return NextResponse.json(updatedPolicy);
  } catch (error) {
    console.error("Error updating policy:", error);
    return NextResponse.json(
      { error: "Failed to update policy" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const policyIndex = policies.findIndex((p) => p.id === params.id);

    if (policyIndex === -1) {
      return NextResponse.json({ error: "Policy not found" }, { status: 404 });
    }

    policies.splice(policyIndex, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting policy:", error);
    return NextResponse.json(
      { error: "Failed to delete policy" },
      { status: 500 },
    );
  }
}
