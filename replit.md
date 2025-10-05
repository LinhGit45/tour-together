# TourTogether

## Overview

TourTogether is a collaborative trip planning web application that enables users to create, share, and manage travel itineraries without requiring authentication. The application focuses on simplicity and ease of use, allowing users to quickly build detailed trip plans with activities, schedules, and locations, then share them via simple links.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (replacing React Router)
- TanStack Query (React Query) for server state management and data fetching

**UI Component System**
- shadcn/ui component library (New York variant) built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Design philosophy inspired by Linear and Apple HIG, emphasizing productivity and minimalism
- Inter font family from Google Fonts for consistent typography
- Custom color palette supporting light/dark modes with HSL-based theming

**State Management**
- React Query handles all server state with custom query client configuration
- Local component state using React hooks (useState, useEffect)
- No global state management library - keeping state close to where it's used

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- TypeScript throughout the backend for type safety
- ESM (ES Modules) module system

**API Design**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Routes defined in `server/routes.ts`:
  - `POST /api/trips` - Create new trip with activities
  - `GET /api/trips/:id` - Fetch trip details and activities
  - `POST /api/trips/:tripId/activities` - Add activity to existing trip
  - Update and delete endpoints for activities

**Data Storage**
- Currently using in-memory storage (`MemStorage` class) for development
- Designed with storage interface (`IStorage`) for easy swapping to persistent database
- Drizzle ORM configured for PostgreSQL via Neon serverless driver
- Schema defined using Drizzle with Zod validation schemas

**Validation & Type Safety**
- Shared types between frontend and backend via `shared/schema.ts`
- Zod schemas for runtime validation of API inputs
- Drizzle-zod integration for automatic schema generation from database models

### Data Models

**Trip Entity**
- `id` - UUID primary key
- `name` - Trip title
- `destination` - Location/city
- `startDate` - ISO date string
- `endDate` - ISO date string  
- `description` - Optional trip details

**Activity Entity**
- `id` - UUID primary key
- `tripId` - Foreign key to trip
- `date` - ISO date string
- `time` - Time string (e.g., "09:00")
- `title` - Activity name
- `location` - Optional venue/address
- `description` - Optional activity details

### Development Workflow

**Build Process**
- Vite builds the client-side React application
- esbuild bundles the server code for production
- Separate output directories: `dist/public` for client, `dist` for server
- TypeScript compilation checking without emit (type checking only)

**Development Server**
- Vite dev server with HMR in development mode
- Express serves API routes and static files in production
- Custom middleware for request logging and error handling
- Replit-specific plugins for development (cartographer, dev banner, runtime error overlay)

## External Dependencies

### Database & ORM
- **Neon PostgreSQL** (@neondatabase/serverless) - Serverless Postgres database
- **Drizzle ORM** - Type-safe SQL query builder with migration support
- **connect-pg-simple** - PostgreSQL session store for Express

### UI Component Libraries
- **Radix UI** - Comprehensive set of unstyled, accessible component primitives (accordion, dialog, dropdown, popover, select, tabs, toast, etc.)
- **shadcn/ui** - Pre-built component system using Radix UI
- **Lucide React** - Icon library for UI elements
- **cmdk** - Command menu component
- **embla-carousel-react** - Carousel/slider component
- **vaul** - Drawer component library

### Form & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation library
- **@hookform/resolvers** - Zod integration for React Hook Form

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - CSS variant management
- **tailwind-merge** - Intelligent Tailwind class merging utility

### Utilities
- **date-fns** - Date manipulation and formatting
- **nanoid** - Unique ID generation
- **clsx** - Conditional className construction