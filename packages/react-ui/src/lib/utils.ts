import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names
 * Uses clsx for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format date to locale string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Get effect badge color based on effect type
 */
export function getEffectColor(effect: string): string {
  switch (effect.toUpperCase()) {
    case 'PERMIT':
      return 'abac-badge-success';
    case 'DENY':
      return 'abac-badge-error';
    default:
      return 'abac-badge-info';
  }
}

/**
 * Get status badge color
 */
export function getStatusColor(isActive: boolean): string {
  return isActive ? 'abac-badge-success' : 'abac-badge-error';
}
