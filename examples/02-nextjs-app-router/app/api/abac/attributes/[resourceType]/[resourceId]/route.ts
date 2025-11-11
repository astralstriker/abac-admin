import { attributesStore } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { resourceType: string; resourceId: string } },
) {
  try {
    const { resourceType, resourceId } = params;
    const key = `${resourceType}:${resourceId}`;

    // Return attributes for this resource, or empty object if not found
    const attributes = attributesStore.get(key) || {};

    return NextResponse.json(attributes, { status: 200 });
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return NextResponse.json(
      { error: "Failed to fetch attributes" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { resourceType: string; resourceId: string } },
) {
  try {
    const { resourceType, resourceId } = params;
    const key = `${resourceType}:${resourceId}`;
    const body = await request.json();

    // Merge new attributes with existing ones
    const existing = attributesStore.get(key) || {};
    const updated = { ...existing, ...body };
    attributesStore.set(key, updated);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("Error updating attributes:", error);
    return NextResponse.json(
      { error: "Failed to update attributes" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { resourceType: string; resourceId: string } },
) {
  try {
    const { resourceType, resourceId } = params;
    const key = `${resourceType}:${resourceId}`;

    // Delete all attributes for this resource
    attributesStore.delete(key);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting attributes:", error);
    return NextResponse.json(
      { error: "Failed to delete attributes" },
      { status: 500 },
    );
  }
}
