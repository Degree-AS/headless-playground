## Project Overview

This project is a Next.js-based web application that demonstrates how we can handle headless based cms platforms. This particular example is based on backend provided by the DynamicWeb 10 website but it can be applied to any other tool with minimal changes (more details below).
The goal is to have a working example application containing functionalities commonly found in ecommerce solutions, like:

- Authentication flow
- Profile pages
- Ability to browse products
- Ability to search for products
- See product details page
- Add products to cart
- Checkout
- Create order

Optionally, we can add examples on how to handle CMS blocks and create mechanism to handle them in Next.js

## Tech Stack

### Core Framework

- **Next.js 16** - React based framework with App Router and Turbopack
- **React 19** - Latest with Client & Server Components
- **TypeScript 5** - Type safety, better developer experience, better output from AI tools

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Lucide React** - Icon library
- **Motion** - Animation library
- **next-themes** - Theme switching (dark/light mode)

### Forms & Validation

- **React Hook Form** - Performant forms with easy validation
- **Zod 4** - TypeScript-first schema validation
- **@hookform/resolvers** - React Hook Form + Zod integration

### Development Tools

- **Storybook** - Component development and documentation
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Data Fetching & State Management

- **TanStack Query 5** - Server state management, caching, and data synchronization
- **Native Fetch API** - Modern HTTP client (replaced Axios)
- **Custom Hooks Layer** - Organized data fetching with React hooks

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│
├── components/            # Reusable React components
│   ├── blocks/           # Page-level component blocks
│   │
│   ├── form-elements/   # Form-related components
│   │   ├── fields/      # Input field components
│   │   └── form.tsx     # Base form wrapper
│   │
│   ├── layout/          # Layout components
│   │   ├── _components/ # Navigation, logo, theme toggle
│   │   ├── footer.tsx   # Footer component
│   │   └── header.tsx   # Header component
│   │
│   ├── motion-primitives/ # Animation components
│   └── ui/              # Base UI components (Design System)
│
├── services/            # API hooks and type definitions
│   ├── user/           # User authentication hooks
│   │   ├── user.hooks.ts   # TanStack Query hooks for login/register
│   │   └── user.types.ts   # User-related types
│   ├── navigation/     # Navigation menu hooks
│   │   ├── navigation.hooks.ts  # TanStack Query hooks for navigation
│   │   └── navigation.types.ts  # Navigation types
│   ├── pages/          # CMS pages hooks
│   │   ├── pages.hooks.ts  # TanStack Query hooks for pages
│   │   └── pages.types.ts  # Page types
│   └── index.ts        # Barrel export
│
├── config/             # Configuration files
│   └── env.ts         # Environment variables handling
│
└── lib/               # Utility functions
    ├── fetch-client.ts # Functional HTTP client wrapper
    ├── query-client-provider.tsx # TanStack Query setup
    └── utils.ts       # Helper functions and utilities
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm package manager (install globally: `npm install -g pnpm`)
- Mockoon (for API mocking) - import `mockoon.json` from repo root

### Installation

1. Create `.env.local` file based on `.env.example`:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ```

2. Install dependencies and start development:
   ```bash
   # Install dependencies
   pnpm install

   # Start Mockoon server (import mockoon.json first)
   # Then start development server
   pnpm dev

   # Start Storybook (optional)
   pnpm storybook
   ```

### Available Scripts

```bash
pnpm dev             # Start development server with Turbopack
pnpm build           # Build for production
pnpm start           # Start production server
pnpm lint            # Run ESLint
pnpm storybook       # Start Storybook development server
pnpm build-storybook # Build Storybook for production
pnpm test:unit       # Run unit tests
pnpm test:storybook  # Run Storybook tests
```

### Recommended VS Code extensions

ESLint
Prettier
Tailwind CSS Intellisense
TypeScript Import Sorter
Vitest

## Development scenarios

### Develop base UI component

Located in `src/components/ui/` - the most basic building blocks for UI. They should never contain any logic specific to any particular app.

**Using ShadCN components:**
```bash
npx shadcn@latest add pagination
```

Remember: ShadCN components are treated as local code after installation. Feel free to update them, change their appearance, or modify as needed. They're just starting points, not a locked library.

**Development workflow:**
- Use Storybook for isolated component development
- Each component has `.tsx` and `.stories.tsx` files
- No running app needed at this stage

### Develop complex page blocks

Located in `src/components/blocks/` - feature-level components that contain business logic, state management, and API integration.

**Examples:**
- Hero sections
- Login/register forms
- FAQ sections
- Product listings

**Characteristics:**
- Use TanStack Query hooks for data fetching
- Compose UI components and form elements
- Handle loading and error states
- See existing examples in the folder

### Develop forms

Located in `src/components/form-elements/` - specialized form inputs integrated with React Hook Form.

**Characteristics:**
- Built on top of UI components
- Automatic error tracking and validation
- "Build and forget" approach - create once, reuse everywhere
- Currently support text and password inputs
- Submit buttons automatically handle loading/disabled states

### Develop API integration

Located in `src/services/` - all client-server communication using TanStack Query hooks.

**Architecture:**
- Each service domain has its own folder (user, navigation, pages)
- `*.hooks.ts` - TanStack Query hooks (queries and mutations)
- `*.types.ts` - TypeScript type definitions
- Uses `fetchClient` from `src/lib/fetch-client.ts`

**Example - Query hook:**
```typescript
export function useNavigation(id: number) {
  return useQuery({
    queryKey: navigationKeys.byId(id),
    queryFn: async () => {
      const response = await fetchClient.get<NavigationResponse>(`/dwapi/frontend/navigations/${id}`)
      return response.nodes.filter(node => node.showInMenu)
    },
    staleTime: 5 * 60 * 1000
  })
}
```

**Example - Mutation hook:**
```typescript
export function useLogin() {
  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      return fetchClient.post<LoginResponse>('/dwapi/users/authenticate', credentials)
    }
  })
}
```

**API Mocking:**
- Mockoon server required for development
- Import `mockoon.json` from repo root
- Start Mockoon before running the app
- API base URL: `http://localhost:4000`

**Testing:**
- Test files: `*.test.ts` alongside hooks
- Cover different HTTP error codes and edge cases
- See `src/services/user/user.test.ts` and `src/services/navigation/navigation.test.ts`

## Forms deep dive

Example: Login form in [src/components/blocks/login/](src/components/blocks/login/)

### Structure

**1. Block wrapper** (`login-block.tsx`)
- General UI block with form surroundings
- Includes styling, card layout, images, policy links
- Renders the `<LoginForm />` component

**2. Form component** (`form/login-form.tsx`)
- Contains the actual form logic
- Uses React Hook Form + Zod validation
- Integrates with TanStack Query mutation

**3. Schema definition** (`form/auth.types.ts`)
- Zod schema for validation
- TypeScript types derived from schema

### Implementation pattern

```typescript
// 1. Define schema
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

// 2. Create form with hook
const form = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: '', password: '' }
})

// 3. Use mutation hook
const loginMutation = useLogin()

// 4. Handle submission
const onSubmit = async (data: LoginFormData) => {
  loginMutation.mutate(data, {
    onSuccess: (response) => { /* handle success */ }
  })
}

// 5. Render form
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <InputField form={form} name="email" label="Email" />
    <PasswordField form={form} name="password" label="Password" />
    <Button loading={loginMutation.isPending}>Login</Button>
  </form>
</Form>
```

### Automatic features
- Individual fields track validation errors automatically
- Submit button handles loading/disabled states automatically
- Form validation happens on blur and submit

### Manual handling
- API errors after submission (not validation errors)
- Can vary by form depending on error format from backend

## Configuration deep dive

All configuration stored in `.env.local` file.

### Type-safe configuration
Located in [src/config/env.ts](src/config/env.ts):
- Validates environment variables at app startup using Zod
- Provides type-safe access to config values
- Never access `process.env` directly outside this file

**Usage:**
```typescript
import { env } from '@/config/env'

const apiUrl = env.NEXT_PUBLIC_API_BASE_URL
```

## Project Architecture roadmap

✅ Project structure defined

✅ Tailwind CSS 4 configured

✅ ShadCN component examples provided

✅ Example blocks provided (hero, login, register)

✅ Storybook configured

✅ Vitest configured with sample unit tests

✅ Mockoon file provided for API mocking

✅ Type-safe configuration created

✅ TanStack Query integration complete

✅ Functional fetch client implemented

✅ Service hooks layer provided (user, navigation, pages)

✅ Prettier rules defined

✅ Form handling base controls created

✅ Sample forms created (login, register)

✅ Next.js DevTools MCP server configured

**Future considerations:**
- Client-side state management (Zustand) for complex UI state
- Additional form field types (select, checkbox, radio, etc.)
- Storybook 10 upgrade when stable (for Next.js 16 compatibility)

## Business cases roadmap

### Completed
✅ **Authentication flow** - Login and registration with JWT tokens, role-based navigation

### To Do
- **Product Quick Search** - Search functionality with autocomplete
- **Product Browser** - Product listing with filters and pagination
- **Product Details Page** - Individual product view with images, description, variants
- **Shopping Cart** - Add/remove items, update quantities, persist cart state
- **Checkout** - Multi-step checkout process with address and payment
- **Profile Pages** - User profile, order history, saved addresses
- **Order Placement** - Create and track orders
