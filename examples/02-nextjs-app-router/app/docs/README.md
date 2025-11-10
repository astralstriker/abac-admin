# ABAC Documentation

This directory contains the documentation site for both `abac-engine` and `@devcraft-ts/abac-admin` packages.

## Structure

```
docs/
├── layout.tsx              # Main documentation layout with sidebar
├── page.tsx                # Documentation home page
├── installation/           # Installation guide
├── quick-start/           # Quick start guide (TODO)
├── abac-engine/           # abac-engine documentation
│   ├── page.tsx          # Overview
│   ├── api-reference/    # API Reference
│   ├── policy-guide/     # Policy Guide
│   ├── examples/         # Examples
│   ├── policy-persistence/ # Policy Persistence
│   ├── error-handling/   # Error Handling
│   └── glossary/         # Glossary
└── abac-admin/            # @devcraft-ts/abac-admin documentation
    ├── page.tsx          # Overview
    ├── core/             # Core package docs
    ├── react/            # React hooks docs
    ├── nextjs/           # Next.js utilities docs
    └── react-ui/         # React UI components docs
```

## Current Status

✅ Documentation layout with sidebar navigation
✅ Home page with overview
✅ Installation guide

🚧 TODO: Create remaining documentation pages by converting markdown files from:
- `node_modules/abac-engine/docs/*.md`
- `packages/*/README.md`

## Adding Documentation Pages

To add a new documentation page:

1. Create a new directory under `app/docs/`
2. Add a `page.tsx` file with your content
3. Update the navigation in `layout.tsx`

Example:

```typescript
// app/docs/my-page/page.tsx
export default function MyPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">My Page Title</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">
        Description goes here
      </p>
      {/* Add more content */}
    </div>
  );
}
```

## Converting Markdown Files

For converting existing markdown documentation to React components, you can:

1. **Manual Conversion**: Copy the markdown content and convert to JSX
2. **Use MDX**: Install `@next/mdx` and configure Next.js to support MDX files
3. **Server-side Rendering**: Read markdown files at build time and convert to HTML

### Option 1: Install MDX Support (Recommended)

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
npm install remark-gfm rehype-highlight
```

Update `next.config.js`:

```javascript
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [require('rehype-highlight')],
  },
})

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
})
```

### Option 2: Server-side Markdown Parsing

```bash
npm install gray-matter remark remark-html
```

Create a utility to read and parse markdown:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getDocContent(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return { data, contentHtml };
}
```

## Styling

The documentation uses:
- Tailwind CSS for styling
- Lucide React for icons
- Dark mode support
- Responsive design

Prose styling is configured in `layout.tsx`:
```typescript
<article className="prose prose-gray dark:prose-invert max-w-none">
  {children}
</article>
```

## Navigation

Navigation is defined in `layout.tsx` in the `navigation` array. Update this array to add new pages to the sidebar.

## Next Steps

1. [ ] Set up MDX or markdown parsing
2. [ ] Convert abac-engine docs from `node_modules/abac-engine/docs/`
3. [ ] Convert package READMEs from `packages/*/README.md`
4. [ ] Add search functionality
5. [ ] Add table of contents for each page
6. [ ] Add "Edit on GitHub" links
7. [ ] Add breadcrumbs
8. [ ] Add previous/next page navigation
