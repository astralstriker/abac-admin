"use client";

import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Code2,
  FileText,
  Github,
  Home,
  Shield,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TableOfContents } from "../../components/TableOfContents";

const ThemeToggle = dynamic(
  () =>
    import("../../components/ThemeToggle").then((mod) => ({
      default: mod.ThemeToggle,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
    ),
  },
);

const navigation = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs", icon: Home },
      { name: "Installation", href: "/docs/installation", icon: FileText },
      { name: "Quick Start", href: "/docs/quick-start", icon: Code2 },
    ],
  },
  {
    title: "abac-engine",
    items: [
      { name: "Overview", href: "/docs/abac-engine", icon: Shield },
      {
        name: "API Reference",
        href: "/docs/abac-engine/api-reference",
        icon: BookOpen,
      },
      {
        name: "Policy Guide",
        href: "/docs/abac-engine/policy-guide",
        icon: FileText,
      },
      { name: "Examples", href: "/docs/abac-engine/examples", icon: Code2 },
      {
        name: "Policy Persistence",
        href: "/docs/abac-engine/policy-persistence",
        icon: FileText,
      },
      {
        name: "Error Handling",
        href: "/docs/abac-engine/error-handling",
        icon: FileText,
      },
      { name: "Glossary", href: "/docs/abac-engine/glossary", icon: BookOpen },
    ],
  },
  {
    title: "@devcraft-ts/abac-admin",
    items: [
      { name: "Overview", href: "/docs/abac-admin", icon: Shield },
      { name: "Core Package", href: "/docs/abac-admin/core", icon: Code2 },
      { name: "React Hooks", href: "/docs/abac-admin/react", icon: Code2 },
      { name: "Next.js Utils", href: "/docs/abac-admin/nextjs", icon: Code2 },
      { name: "React UI", href: "/docs/abac-admin/react-ui", icon: Code2 },
    ],
  },
  {
    title: "Community",
    items: [
      { name: "Contributing", href: "/docs/contributing", icon: BookOpen },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/docs"
                className="flex items-center space-x-2 text-xl font-bold"
              >
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span>ABAC Docs</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to App</span>
              </Link>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <a
                  href="https://github.com/astralstriker/abac-engine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  title="abac-engine repository"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">engine</span>
                </a>
                <a
                  href="https://github.com/astralstriker/abac-engine/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  title="abac-engine issues"
                >
                  <AlertCircle className="w-4 h-4" />
                </a>
              </div>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center space-x-2">
                <a
                  href="https://github.com/astralstriker/abac-admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  title="abac-admin repository"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">admin</span>
                </a>
                <a
                  href="https://github.com/astralstriker/abac-admin/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  title="abac-admin issues"
                >
                  <AlertCircle className="w-4 h-4" />
                </a>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-8">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="max-w-4xl">
              <article className="prose prose-gray dark:prose-invert max-w-none">
                {children}
              </article>
            </div>
          </main>

          {/* Table of Contents - Right Sidebar */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                On This Page
              </h3>
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
