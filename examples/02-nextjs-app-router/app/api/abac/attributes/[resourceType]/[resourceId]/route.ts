import { NextRequest, NextResponse } from "next/server";

// Mock attribute storage (in a real app, this would be a database)
const mockAttributes: Record<string, Record<string, any>> = {
  "user:user-123": {
    role: "admin",
    department: "engineering",
    level: 5,
    verified: true,
    joinDate: "2023-01-15",
    permissions: ["read", "write", "delete"],
  },
  "document:doc-456": {
    classification: "confidential",
    owner: "user-123",
    createdAt: "2024-01-10",
    tags: ["finance", "Q1", "report"],
    version: 3,
  },
  "organization:org-789": {
    name: "Acme Corp",
    industry: "Technology",
    size: "enterprise",
    country: "US",
    active: true,
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { resourceType: string; resourceId: string } }
) {
  try {
    const { resourceType, resourceId } = params;
    const key = `${resourceType}:${resourceId}`;

    // Return attributes for this resource, or empty object if not found
    const attributes = mockAttributes[key] || {};

    return NextResponse.json(attributes, { status: 200 });
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return NextResponse.json(
      { error: "Failed to fetch attributes" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { resourceType: string; resourceId: string } }
) {
  try {
    const { resourceType, resourceId } = params;
    const key = `${resourceType}:${resourceId}`;
    const body = await request.json();

    // Merge new attributes with existing ones
    if (!mockAttributes[key]) {
      mockAttributes[key] = {};
    }

    Object.assign(mockAttributes[key], body);

    return NextResponse.json(mockAttributes[key], { status: 200 });
  } catch (error) {
    console.error("Error updating attributes:", error);
    return NextResponse.json(
      { error: "Failed to update attributes" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { resourceType: string; resourceId: string } }
) {
  try {
    const { resourceType, resourceId } = params;
    const key = `${resourceType}:${resourceId}`;

    // Delete all attributes for this resource
    delete mockAttributes[key];

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting attributes:", error);
    return NextResponse.json(
      { error: "Failed to delete attributes" },
      { status: 500 }
    );
  }
}
