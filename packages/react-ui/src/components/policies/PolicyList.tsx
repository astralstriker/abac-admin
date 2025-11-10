import { usePolicies } from '@devcraft-ts/abac-admin-react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import React from 'react';
import { formatDate } from '../../lib/utils';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Input } from '../ui/Input';

export interface PolicyListProps {
  onEdit?: (policyId: string) => void;
  onDelete?: (policyId: string) => void;
  onCreate?: () => void;
  onView?: (policyId: string) => void;
}

export const PolicyList: React.FC<PolicyListProps> = ({
  onEdit,
  onDelete,
  onCreate,
  onView,
}) => {
  const { policies, isLoading, error, deletePolicy } = usePolicies();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredPolicies = React.useMemo(() => {
    if (!policies) return [];
    if (!searchTerm) return policies;

    const term = searchTerm.toLowerCase();
    return policies.filter(
      (policy) =>
        policy.policyId.toLowerCase().includes(term) ||
        policy.description?.toLowerCase().includes(term) ||
        policy.category?.toLowerCase().includes(term)
    );
  }, [policies, searchTerm]);

  const handleDelete = async (policyId: string) => {
    if (window.confirm(`Are you sure you want to delete policy "${policyId}"?`)) {
      try {
        await deletePolicy(policyId);
        if (onDelete) onDelete(policyId);
      } catch (err) {
        console.error('Failed to delete policy:', err);
      }
    }
  };

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <p className="font-semibold">Error loading policies</p>
            <p className="text-sm mt-1">{error.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Policies</CardTitle>
            <CardDescription>
              Manage your ABAC policies and access control rules
            </CardDescription>
          </div>
          {onCreate && (
            <Button onClick={onCreate} leftIcon={<Plus className="h-4 w-4" />}>
              Create Policy
            </Button>
          )}
        </div>
        <div className="mt-4">
          <Input
            placeholder="Search policies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredPolicies.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="font-medium">No policies found</p>
            {searchTerm ? (
              <p className="text-sm mt-1">Try adjusting your search terms</p>
            ) : (
              <p className="text-sm mt-1">Create your first policy to get started</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="abac-table">
              <thead className="abac-table-header">
                <tr className="abac-table-row">
                  <th className="abac-table-head">Policy ID</th>
                  <th className="abac-table-head">Version</th>
                  <th className="abac-table-head">Effect</th>
                  <th className="abac-table-head">Status</th>
                  <th className="abac-table-head">Category</th>
                  <th className="abac-table-head">Created</th>
                  <th className="abac-table-head text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPolicies.map((policy) => (
                  <tr
                    key={policy.id}
                    className="abac-table-row cursor-pointer"
                    onClick={() => onView && onView(policy.id)}
                  >
                    <td className="abac-table-cell">
                      <div className="font-medium">{policy.policyId}</div>
                      {policy.description && (
                        <div className="text-sm text-muted-foreground mt-1">
                          {policy.description}
                        </div>
                      )}
                    </td>
                    <td className="abac-table-cell">
                      <Badge variant="info">{policy.version}</Badge>
                    </td>
                    <td className="abac-table-cell">
                      <Badge
                        variant={
                          policy.effect === 'PERMIT'
                            ? 'success'
                            : policy.effect === 'DENY'
                            ? 'error'
                            : 'default'
                        }
                      >
                        {policy.effect}
                      </Badge>
                    </td>
                    <td className="abac-table-cell">
                      <Badge variant={policy.isActive ? 'success' : 'error'}>
                        {policy.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="abac-table-cell">
                      {policy.category && (
                        <Badge variant="default">{policy.category}</Badge>
                      )}
                    </td>
                    <td className="abac-table-cell text-sm text-muted-foreground">
                      {formatDate(policy.createdAt)}
                    </td>
                    <td className="abac-table-cell">
                      <div
                        className="flex items-center justify-end gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(policy.id)}
                            leftIcon={<Edit className="h-3 w-3" />}
                          >
                            Edit
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(policy.id)}
                            leftIcon={<Trash2 className="h-3 w-3" />}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
