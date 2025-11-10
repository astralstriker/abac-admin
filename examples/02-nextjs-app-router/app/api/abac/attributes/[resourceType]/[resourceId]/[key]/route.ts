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
  {
    params,
  }: { params: { resourceType: string; resourceId: string; key: string } }
) {
  try {
    const { resourceType, resourceId, key } = params;
    const storageKey = `${resourceType}:${resourceId}`;

    const attributes = mockAttributes[storageKey];
    if (!attributes || !(key in attributes)) {
      return NextResponse.json(
        { error: "Attribute not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ value: attributes[key] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching attribute:", error);
    return NextResponse.json(
      { error: "Failed to fetch attribute" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  {
    params,
  }: { params: { resourceType: string; resourceId: string; key: string } }
) {
  try {
    const { resourceType, resourceId, key } = params;
    const storageKey = `${resourceType}:${resourceId}`;
    const body = await request.json();

    if (!body || !("value" in body)) {
      return NextResponse.json(
        { error: "Request body must include 'value' field" },
        { status: 400 }
      );
    }

    // Initialize attributes object if it doesn't exist
    if (!mockAttributes[storageKey]) {
      mockAttributes[storageKey] = {};
    }

    // Set the attribute value
    mockAttributes[storageKey][key] = body.value;

    return NextResponse.json(
      {
        resourceType,
        resourceId,
        key,
        value: body.value,
        updatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating attribute:", error);
    return NextResponse.json(
      { error: "Failed to update attribute" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: { params: { resourceType: string; resourceId: string; key: string } }
) {
  try {
    const { resourceType, resourceId, key } = params;
    const storageKey = `${resourceType}:${resourceId}`;

    const attributes = mockAttributes[storageKey];
    if (!attributes || !(key in attributes)) {
      return NextResponse.json(
        { error: "Attribute not found" },
        { status: 404 }
      );
    }

    // Delete the attribute
    delete mockAttributes[storageKey][key];

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting attribute:", error);
    return NextResponse.json(
      { error: "Failed to delete attribute" },
      { status: 500 }
    );
  }
}
