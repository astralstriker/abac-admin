"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to ensure DOM is updated after navigation
    const timeout = setTimeout(() => {
      // Extract headings from the article
      const article = document.querySelector("article");
      if (!article) return;

      const headings = article.querySelectorAll("h2, h3");
      const tocItems: TocItem[] = [];

      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.substring(1));
        const text = heading.textContent || "";

        // Create or get ID for the heading
        let id = heading.id;
        if (!id) {
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          heading.id = id;
        }

        tocItems.push({ id, text, level });
      });

      setToc(tocItems);
      // Reset active ID on page change
      setActiveId("");
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update active ID and URL
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (toc.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-500">
        No headings found
      </div>
    );
  }

  return (
    <nav className="space-y-2">
      {toc.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleClick(e, item.id)}
          className={`block text-sm transition-colors ${
            item.level === 3 ? "pl-4" : ""
          } ${
            activeId === item.id
              ? "text-blue-600 dark:text-blue-400 font-medium"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
