import { ResourceType, useAttributes } from "@devcraft-ts/abac-admin-react";
import { Edit, Plus, Search, Tag, Trash2 } from "lucide-react";
import React from "react";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Input } from "../ui/Input";

export interface AttributeManagerProps {
  resourceType: ResourceType;
  resourceId: string;
  onEdit?: (attributeKey: string) => void;
  onDelete?: (attributeKey: string) => void;
  onCreate?: () => void;
  className?: string;
}

export const AttributeManager: React.FC<AttributeManagerProps> = ({
  resourceType,
  resourceId,
  onEdit,
  onDelete,
  onCreate,
  className,
}) => {
  const { attributes, isLoading, error, deleteAttribute } = useAttributes(
    resourceType,
    resourceId,
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredAttributes = React.useMemo(() => {
    if (!attributes) return [];

    let filtered = Object.entries(attributes);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        ([key, value]) =>
          key.toLowerCase().includes(term) ||
          String(value).toLowerCase().includes(term),
      );
    }

    return filtered;
  }, [attributes, searchTerm]);

  const handleDelete = async (attributeKey: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete attribute "${attributeKey}"?`,
      )
    ) {
      try {
        await deleteAttribute(attributeKey);
        if (onDelete) onDelete(attributeKey);
      } catch (err) {
        console.error("Failed to delete attribute:", err);
      }
    }
  };

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-red-600 dark:text-red-400">
              Error loading attributes: {error.message}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Attributes
            </CardTitle>
            <CardDescription>
              Manage attributes for {resourceType}: {resourceId}
            </CardDescription>
          </div>
          {onCreate && (
            <Button
              onClick={onCreate}
              variant="primary"
              size="sm"
              leftIcon={<Plus className="h-4 w-4" />}
            >
              New Attribute
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder="Search attributes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Attributes List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : filteredAttributes.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              {searchTerm ? "No attributes found" : "No attributes yet"}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {searchTerm
                ? "Try adjusting your search"
                : "Add attributes to get started"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAttributes.map(([key, value]) => (
              <div
                key={key}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-200",
                  "bg-white dark:bg-gray-900/50",
                  "border-gray-200 dark:border-gray-800",
                  "hover:border-gray-300 dark:hover:border-gray-700",
                  "hover:shadow-sm",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {key}
                      </h3>
                      <Badge variant="info" className="flex-shrink-0">
                        {typeof value}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {typeof value === "object"
                        ? JSON.stringify(value, null, 2)
                        : String(value)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(key)}
                        leftIcon={<Edit className="h-4 w-4" />}
                      >
                        Edit
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(key)}
                        leftIcon={<Trash2 className="h-4 w-4" />}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {!isLoading && filteredAttributes.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredAttributes.length} of{" "}
              {Object.keys(attributes || {}).length} attributes
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
