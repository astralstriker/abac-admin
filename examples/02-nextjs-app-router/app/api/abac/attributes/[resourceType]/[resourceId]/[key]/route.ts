import { addAuditEntry, attributesStore } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: { params: { resourceType: string; resourceId: string; key: string } },
) {
  try {
    const { resourceType, resourceId, key } = params;
    const storageKey = `${resourceType}:${resourceId}`;

    const attributes = attributesStore.get(storageKey);
    if (!attributes || !(key in attributes)) {
      return NextResponse.json(
        { error: "Attribute not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ value: attributes[key] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching attribute:", error);
    return NextResponse.json(
      { error: "Failed to fetch attribute" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  {
    params,
  }: { params: { resourceType: string; resourceId: string; key: string } },
) {
  try {
    const { resourceType, resourceId, key } = params;
    const storageKey = `${resourceType}:${resourceId}`;
    const body = await request.json();

    if (!body || !("value" in body)) {
      return NextResponse.json(
        { error: "Request body must include 'value' field" },
        { status: 400 },
      );
    }

    // Get existing attributes
    const existing = attributesStore.get(storageKey) || {};
    const oldValue = existing[key];
    const isCreate = !(key in existing);

    // Set the attribute value
    existing[key] = body.value;
    attributesStore.set(storageKey, existing);

    // Add audit log entry
    addAuditEntry(
      "attribute",
      storageKey,
      isCreate ? "CREATE" : "UPDATE",
      "demo-user",
      isCreate ? undefined : { [key]: oldValue },
      { [key]: body.value },
      { attributeKey: key },
    );

    return NextResponse.json(
      {
        resourceType,
        resourceId,
        key,
        value: body.value,
        updatedAt: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating attribute:", error);
    return NextResponse.json(
      { error: "Failed to update attribute" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: { params: { resourceType: string; resourceId: string; key: string } },
) {
  try {
    const { resourceType, resourceId, key } = params;
    const storageKey = `${resourceType}:${resourceId}`;

    const attributes = attributesStore.get(storageKey);
    if (!attributes || !(key in attributes)) {
      return NextResponse.json(
        { error: "Attribute not found" },
        { status: 404 },
      );
    }

    const oldValue = attributes[key];

    // Delete the attribute
    delete attributes[key];
    attributesStore.set(storageKey, attributes);

    // Add audit log entry
    addAuditEntry(
      "attribute",
      storageKey,
      "DELETE",
      "demo-user",
      { [key]: oldValue },
      undefined,
      { attributeKey: key },
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting attribute:", error);
    return NextResponse.json(
      { error: "Failed to delete attribute" },
      { status: 500 },
    );
  }
}
