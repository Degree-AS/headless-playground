# Headless Playground Monorepo

This monorepo contains both frontend and backend applications for the headless CMS demonstration project.

## Project Structure

```
.
├── frontend/          # Next.js frontend application
│   ├── src/
│   ├── public/
│   └── package.json
│
└── backend/           # Backend API (coming soon)
    └── package.json
```

## Getting Started

### Frontend

Next.js-based web application that demonstrates headless CMS integration with DynamicWeb 10.

**Tech stack:**
- Next.js 16 with App Router
- React 19
- TypeScript 5
- TanStack Query 5
- Tailwind CSS 4
- Storybook 9

**Quick start:**
```bash
cd frontend
pnpm install
pnpm dev
```

See [frontend/README.md](frontend/README.md) for detailed documentation.

### Backend

Coming soon...

## Development

### Prerequisites
- Node.js (Latest LTS)
- pnpm (install: `npm install -g pnpm`)
- Mockoon (for API mocking)

### Monorepo Management

Each workspace has its own `package.json` and dependencies. Navigate to the specific workspace directory to run commands:

```bash
# Frontend
cd frontend
pnpm dev

# Backend (when ready)
cd backend
pnpm dev
```

## Documentation

- [Frontend Documentation](frontend/README.md)
- Backend Documentation (coming soon)
