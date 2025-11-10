# ABAC Admin Demo - Features & Guide

## 🎨 Beautiful Dark/Light Mode UI

This demo showcases a production-ready ABAC (Attribute-Based Access Control) policy management interface with a stunning dark/light mode design inspired by Vercel Analytics. **Dark mode is enabled by default**, with a seamless theme switcher in the navigation bar.

## ✨ Key Features

### 1. Visual Condition Builder

**No more JSON configuration!** Build complex policy conditions with an intuitive visual interface.

- **Simple Operators**: equals, notEquals, in, contains, startsWith, endsWith, matches (regex), and comparison operators (>, <, >=, <=)
- **Logical Operators**: AND, OR, NOT with unlimited nesting
- **Quick Insert**: One-click attribute category insertion (Subject, Resource, Action, Environment)
- **Real-time Preview**: See your conditions update as you build them
- **Toggle Mode**: Switch between visual builder and JSON editor seamlessly

### 2. Complete CRUD Operations

- ✅ **Create**: Add new policies with the visual form
- ✅ **Read**: Browse all policies with search and filtering
- ✅ **Update**: Edit existing policies in-place
- ✅ **Delete**: Remove policies with confirmation

### 3. Modern Dark/Light Mode Design

- 🌙 **Theme Switcher**: Toggle between dark and light modes with smooth transitions
- 🎨 **Dark Mode by Default**: Optimized for low-light environments
- ☀️ **Light Mode**: Clean, bright theme for daytime use
- 💾 **Persistent Preference**: Your theme choice is saved to localStorage
- 🎨 **Gradient Accents**: Beautiful blue-to-purple gradients throughout
- ✨ **Smooth Animations**: Fade-in, slide-up, and scale effects with animated theme transitions
- 🔍 **Glass Morphism**: Backdrop blur effects for modern aesthetics
- 📱 **Responsive**: Works perfectly on mobile, tablet, and desktop
- 🚫 **No Flash**: Theme is applied before page render to prevent flashing

### 4. Professional Navigation

- **Sticky Header**: Always accessible navigation with glassmorphism effect
- **Theme Toggle**: Animated sun/moon icon to switch between light and dark modes
- **Live Status**: Real-time indicator showing system status
- **Quick Links**: Easy navigation between home and policies
- **Gradient Logo**: Eye-catching branding

### 5. Policy Viewer with Sandbox

Test your policies in real-time with an interactive sandbox:

- **Visual Condition Display**: See policy conditions rendered beautifully
- **JSON Toggle**: Switch between visual and JSON views
- **Interactive Testing**: Input custom context (subject, resource, action, environment)
- **Real-time Evaluation**: Run policies against test data and see instant results
- **Decision Feedback**: Clear PERMIT/DENY indicators with color-coded results
- **Audit Trail**: See when policies were created, updated, and by whom

### 6. Landing Page

A stunning hero section featuring:

- Animated gradient text
- Feature showcase with hover effects
- Stats display (avg response time, uptime, policies evaluated)
- Code example section
- Call-to-action buttons

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000` to see the demo.

### Build

```bash
npm run build
```

## 📂 Project Structure

```
app/
├── api/
│   └── abac/
│       ├── policies/          # Policy CRUD endpoints
│       │   ├── [id]/route.ts  # GET, PUT, DELETE single policy
│       │   └── route.ts       # GET all, POST new policy
│       └── evaluate/          # Policy evaluation endpoint
│           └── route.ts
├── policies/
│   ├── create/                # Create new policy page
│   ├── edit/[id]/             # Edit existing policy page
│   └── page.tsx               # Policy list page
├── layout.tsx                 # Root layout with navigation
├── page.tsx                   # Landing page
└── globals.css                # Global styles with dark mode

lib/
└── policies-data.ts           # Mock policy data
```

## 🎯 How to Use

### Creating a Policy

1. Click **"Get Started"** or navigate to `/policies`
2. Click **"Create Policy"** button
3. Fill in the basic information:
   - Policy ID (unique identifier)
   - Version (e.g., 1.0.0)
   - Description
   - Effect (PERMIT or DENY)
   - Category (optional)
   - Tags (optional)
4. Build conditions using the **Visual Builder**:
   - Select an operator (equals, in, and, or, etc.)
   - For comparison operators, enter left and right values
   - For logical operators, add nested conditions
   - Use quick insert buttons for common attributes
5. Toggle to JSON mode if you prefer manual editing
6. Click **"Create Policy"** to save

### Editing a Policy

1. From the policy list, click **"Edit"** on any policy
2. Modify any fields as needed
3. Update conditions visually or via JSON
4. Click **"Update Policy"** to save changes

### Visual Condition Builder Examples

#### Simple Condition

- Type: `equals`
- Left: `subject.role`
- Right: `admin`

#### Complex AND Condition

- Type: `and`
- Nested Conditions:
  - Condition 1: `subject.role` equals `user`
  - Condition 2: `resource.type` equals `document`
  - Condition 3: `action` equals `read`

#### Complex OR with Nested AND

- Type: `or`
- Nested Conditions:
  - Condition 1 (AND):
    - `subject.role` equals `admin`
    - `resource.critical` equals `true`
  - Condition 2: `subject.id` equals `resource.owner`

## 🎨 Design System

### Color Palette

**Light Mode:**

- Background: White (#FFFFFF) with subtle gradients to Gray-100
- Text: Gray-900 for primary, Gray-600 for secondary
- Cards: White with Gray-200 borders
- Accents: Blue-600, Purple-600
- Shadows: Subtle gray shadows for depth

**Dark Mode (Default):**

- Background: #0a0a0a with subtle gradients to #111111
- Text: White for primary, Gray-400 for secondary
- Cards: Gray-900 (#111111) with Gray-800 borders
- Accents: Blue-400, Purple-400
- Shadows: Blue/purple glows for depth and visual interest

**Theme Switching:**

- Instant toggle via navigation bar button
- Smooth color transitions (200ms)
- Persistent storage in localStorage
- No flash on page load
- Animated sun/moon icon

### Components

- **Cards**: White/Gray-900 with hover effects
- **Buttons**: Multiple variants (primary, secondary, ghost, outline)
- **Badges**: Color-coded by status (success, error, warning, info)
- **Inputs**: Clean design with focus states
- **Tables**: Striped rows with hover highlighting

## 🔧 Technical Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: @devcraft-ts/abac-admin-react-ui
- **Styling**: Tailwind CSS with custom dark mode
- **Icons**: Lucide React
- **Policy Engine**: abac-engine
- **TypeScript**: Full type safety
- **Validation**: Zod schemas

## 📦 Packages Used

```json
{
  "@devcraft-ts/abac-admin-core": "^1.0.2",
  "@devcraft-ts/abac-admin-react": "^1.0.2",
  "@devcraft-ts/abac-admin-react-ui": "^1.0.2",
  "@devcraft-ts/abac-admin-nextjs": "^1.0.2",
  "abac-engine": "^1.1.0",
  "lucide-react": "^0.300.0",
  "next": "^14.2.0",
  "react": "^18.3.0",
  "tailwindcss": "^3.4.3"
}
```

## 🎓 Learning Resources

### Understanding ABAC

ABAC (Attribute-Based Access Control) allows you to define policies based on attributes of:

- **Subject**: Who is making the request (user role, department, etc.)
- **Resource**: What is being accessed (document type, sensitivity level, etc.)
- **Action**: What operation is being performed (read, write, delete, etc.)
- **Environment**: Context of the request (time, location, IP address, etc.)

### Policy Structure

```typescript
{
  id: "1",
  policyId: "allow-read-docs",
  version: "1.0.0",
  effect: "PERMIT",
  description: "Allow users to read documents",
  conditions: {
    type: "equals",
    left: "subject.role",
    right: "user"
  },
  isActive: true,
  category: "document",
  tags: ["read"],
  createdBy: "admin",
  createdAt: "2025-01-10T12:00:00.000Z",
  updatedBy: null,
  updatedAt: "2025-01-10T12:00:00.000Z",
  deletedAt: null,
  deletedBy: null
}
```

## 🎨 Theme Customization

The theme system is built with:

- **React Context**: Global theme state management
- **localStorage**: Persistent theme preference
- **Tailwind CSS**: Dark mode class strategy
- **CSS Variables**: Dynamic color tokens

To customize colors, edit `app/globals.css` and `tailwind.config.ts`.

## 🚀 Deployment

This demo can be deployed to:

- **Vercel**: Zero-config deployment (recommended)
- **Netlify**: Easy integration with Git
- **AWS Amplify**: Scalable hosting
- **Docker**: Containerized deployment

**Note**: The theme preference is stored in localStorage and persists across sessions.

## 📝 Notes

- This is a **demo application** using in-memory storage
- For production, replace mock data with a real database (PostgreSQL, MongoDB, etc.)
- Add authentication middleware to secure API routes
- Implement proper error handling and logging
- Add comprehensive test coverage

## 🤝 Contributing

This demo is part of the @devcraft-ts/abac-admin package suite. Contributions are welcome!

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ by the @devcraft-ts team**
