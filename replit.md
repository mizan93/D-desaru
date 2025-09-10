# Overview

This is a full-stack web application built with a React frontend and Express.js backend, designed for managing customer inquiries (likely for a hospitality or accommodation business). The application uses a modern tech stack with TypeScript, Tailwind CSS, and shadcn/ui components for the frontend, and Drizzle ORM with PostgreSQL for data persistence. The system follows a monorepo structure with shared schemas and a clean separation between client and server code.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: Wouter for client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Styling**: Tailwind CSS with custom CSS variables for theming, using the "new-york" style variant

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **API Design**: RESTful API with standardized JSON responses
- **Validation**: Zod schemas shared between frontend and backend for consistent data validation
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development**: Hot reload support with tsx for TypeScript execution

## Data Storage
- **Database**: PostgreSQL with Neon Database as the serverless provider
- **Schema Management**: Drizzle Kit for database migrations and schema management
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **Data Models**: Single inquiries table with fields for customer contact information, dates, and messages

## Project Structure
- **Monorepo Layout**: Client, server, and shared code in separate directories
- **Shared Schema**: Common TypeScript types and Zod validation schemas in `/shared`
- **Type Safety**: End-to-end type safety from database to frontend using TypeScript and Zod
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)

## Development Features
- **Hot Reload**: Development server with automatic reloading for both client and server
- **Error Handling**: Runtime error overlay for development debugging
- **Path Aliases**: Configured aliases for clean imports (`@/`, `@shared/`)
- **Code Quality**: TypeScript strict mode with comprehensive type checking

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI and Styling
- **Radix UI**: Accessible component primitives for all UI interactions
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library with customizable design tokens

## Development Tools
- **Vite**: Fast build tool and development server for the frontend
- **tsx**: TypeScript execution engine for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

## Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting utilities

## Hosting and Deployment
- **Replit**: Development environment with integrated hosting capabilities
- **Environment Variables**: DATABASE_URL for database connection configuration