import { auditLogStore } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get filter parameters
    const entityType = searchParams.get("entityType");
    const entityId = searchParams.get("entityId");
    const userId = searchParams.get("userId");
    const action = searchParams.get("action");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // Filter audit log entries
    let filteredEntries = [...auditLogStore];

    if (entityType) {
      filteredEntries = filteredEntries.filter(
        (entry) => entry.entityType === entityType,
      );
    }

    if (entityId) {
      filteredEntries = filteredEntries.filter(
        (entry) => entry.entityId === entityId,
      );
    }

    if (userId) {
      filteredEntries = filteredEntries.filter(
        (entry) => entry.userId === userId,
      );
    }

    if (action) {
      filteredEntries = filteredEntries.filter(
        (entry) => entry.action === action,
      );
    }

    if (startDate) {
      const start = new Date(startDate);
      filteredEntries = filteredEntries.filter(
        (entry) => new Date(entry.timestamp) >= start,
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      filteredEntries = filteredEntries.filter(
        (entry) => new Date(entry.timestamp) <= end,
      );
    }

    // Sort by timestamp (newest first)
    filteredEntries.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    // Apply pagination
    const total = filteredEntries.length;
    const paginatedEntries = filteredEntries.slice(offset, offset + limit);
    const hasMore = offset + limit < total;

    return NextResponse.json(
      {
        entries: paginatedEntries,
        total,
        limit,
        offset,
        hasMore,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching audit log:", error);
    return NextResponse.json(
      { error: "Failed to fetch audit log" },
      { status: 500 },
    );
  }
}
