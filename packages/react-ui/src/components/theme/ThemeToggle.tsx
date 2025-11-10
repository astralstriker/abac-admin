import { Moon, Sun } from "lucide-react";
import React from "react";
import { cn } from "../../lib/utils";
import { useTheme } from "./ThemeProvider";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "button" | "icon";
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  size = "md",
  variant = "icon",
  showLabel = false,
}) => {
  const { actualTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder during SSR/initial render to avoid hydration errors
  if (!mounted) {
    if (variant === "button") {
      return (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium",
            "text-gray-700 dark:text-gray-200 bg-gray-100",
            "dark:bg-gray-800 rounded-lg opacity-0",
            className,
          )}
        >
          <Sun size={iconSizes[size]} />
        </div>
      );
    }
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center rounded-lg opacity-0",
          sizeClasses[size],
          className,
        )}
      >
        <Sun size={iconSizes[size]} />
      </div>
    );
  }

  if (variant === "button") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium",
          "text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200",
          "dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg",
          "transition-all duration-200 focus:outline-none focus:ring-2",
          "focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
          className,
        )}
        aria-label={`Switch to ${actualTheme === "light" ? "dark" : "light"} mode`}
      >
        {actualTheme === "light" ? (
          <>
            <Moon size={iconSizes[size]} />
            {showLabel && <span>Dark Mode</span>}
          </>
        ) : (
          <>
            <Sun size={iconSizes[size]} />
            {showLabel && <span>Light Mode</span>}
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded-lg",
        "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
        "transition-all duration-200 focus:outline-none focus:ring-2",
        "focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
        sizeClasses[size],
        className,
      )}
      aria-label={`Switch to ${actualTheme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${actualTheme === "light" ? "dark" : "light"} mode`}
    >
      {actualTheme === "light" ? (
        <Moon
          size={iconSizes[size]}
          className="transition-transform duration-200 hover:rotate-12"
        />
      ) : (
        <Sun
          size={iconSizes[size]}
          className="transition-transform duration-200 hover:rotate-12"
        />
      )}
    </button>
  );
};

ThemeToggle.displayName = "ThemeToggle";
