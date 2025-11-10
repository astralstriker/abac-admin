// UI Components
export { Button } from "./components/ui/Button";
export type { ButtonProps } from "./components/ui/Button";

export { Input } from "./components/ui/Input";
export type { InputProps } from "./components/ui/Input";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/Card";
export type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "./components/ui/Card";

export { Badge } from "./components/ui/Badge";
export type { BadgeProps } from "./components/ui/Badge";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/Dialog";
export type {
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogProps,
  DialogTitleProps,
} from "./components/ui/Dialog";

// Policy Components
export { PolicyList } from "./components/policies/PolicyList";
export type { PolicyListProps } from "./components/policies/PolicyList";

// Utilities
export {
  cn,
  formatDate,
  getEffectColor,
  getStatusColor,
  truncate,
} from "./lib/utils";

// Re-export from react package for convenience
export {
  ABACProvider,
  useAttributes,
  useAuditLog,
  usePolicies,
  usePolicy,
} from "@devcraft-ts/abac-admin-react";
