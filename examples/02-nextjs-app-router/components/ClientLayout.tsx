"use client";

import { BookOpen, Home, Shield } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./ThemeProvider";

const ThemeToggle = dynamic(
  () => import("./ThemeToggle").then((mod) => ({ default: mod.ThemeToggle })),
  {
    ssr: false,
    loading: () => (
      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
    ),
  },
);

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDocsPage = pathname?.startsWith("/docs");

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
        {/* Navigation - Hidden on docs pages */}
        {!isDocsPage && (
          <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50 dark:shadow-blue-500/30">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                      ABAC Admin
                    </h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Policy Management
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="inline-flex items-center space-x-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/policies"
                    className="inline-flex items-center space-x-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Policies</span>
                  </Link>
                  <Link
                    href="/docs"
                    className="inline-flex items-center space-x-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Documentation</span>
                  </Link>
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 dark:bg-gray-800 rounded-lg border border-green-200 dark:border-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-green-700 dark:text-gray-300">
                      Live
                    </span>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>
        )}

        {/* Main content */}
        <main className="relative bg-gradient-to-b from-white via-gray-50/50 to-gray-100/30 dark:from-[#0a0a0a] dark:via-[#0a0a0a] dark:to-[#111111] min-h-[calc(100vh-4rem)]">
          {/* Gradient orbs for visual interest */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">{children}</div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto bg-white dark:bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Powered by
                </span>
                <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  @devcraft-ts/abac-admin
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <a
                  href="https://github.com/devcraft-ts/abac-admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://npmjs.com/org/devcraft-ts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  npm
                </a>
                <a
                  href="/docs"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
