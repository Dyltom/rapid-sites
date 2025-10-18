# Rapid Sites - Claude Code Settings

## Project Context

This is a Next.js-based multi-tenant website framework for rapidly building and deploying small business websites. The project combines Next.js 15, Payload CMS 3.0, shadcn/ui, and TypeScript to create a production-ready platform for agencies serving small business clients.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **CMS**: Payload CMS 3.0 (native Next.js integration)
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui, Magic UI, Aceternity UI
- **Animations**: Framer Motion
- **Deployment**: Docker, Coolify

## Code Style & Conventions

### General Guidelines

- Use TypeScript for all code with strict type checking
- Follow Next.js 15 App Router conventions
- Use server components by default, client components only when needed
- Prefer composition over inheritance
- Write self-documenting code with clear naming

### File Organization

```
src/
├── app/              # Next.js app directory
│   ├── (app)/       # Main site routes
│   ├── (admin)/     # Payload admin (automatic)
│   └── api/         # API routes
├── components/       # Shared components
│   ├── ui/          # shadcn/ui base components
│   ├── sections/    # Reusable page sections
│   └── templates/   # Full page templates
├── lib/             # Utilities and shared code
├── payload/         # Payload CMS configuration
│   ├── collections/ # Content collections
│   └── globals/     # Global settings
└── styles/          # Global styles
```

### Naming Conventions

- **Components**: PascalCase (`ButtonPrimary.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_FILE_SIZE`)
- **Types/Interfaces**: PascalCase with descriptive names (`UserProfile`, `SiteConfig`)
- **Files**: Use kebab-case for non-component files (`use-media-query.ts`)

### Component Structure

```tsx
// Imports
import { type ComponentProps } from 'react'

// Types
interface MyComponentProps {
  title: string
  description?: string
}

// Component
export function MyComponent({ title, description }: MyComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  )
}
```

### Payload Collections

- Each collection should have its own file in `src/payload/collections/`
- Use TypeScript for collection configs
- Include access control for multi-tenancy
- Add proper field validations

## Development Workflow

### Before Starting Work

1. Check ROADMAP.md for current priorities
2. Review related documentation
3. Ensure database is running
4. Run `pnpm dev` to start development server

### When Adding Features

1. Create feature branch from `main`
2. Update relevant documentation
3. Add tests if applicable
4. Update ROADMAP.md if completing a task
5. Commit with descriptive messages

### Commit Message Format

```
type(scope): brief description

- Detailed change 1
- Detailed change 2
```

Types: feat, fix, docs, style, refactor, test, chore

## Multi-Tenancy Architecture

### Key Principles

- All client data must be scoped to tenant
- Use tenant context for database queries
- Implement row-level security where possible
- Isolate media uploads per tenant
- Separate admin access by tenant

### Tenant Identification

- Subdomain-based: `client1.rapidsites.com`
- Custom domain support: `www.clientsite.com`
- Tenant ID stored in database and context

## Component Library Usage

### shadcn/ui Components

- Copy components from shadcn/ui into `src/components/ui/`
- Customize as needed for project requirements
- Use CSS variables for theming
- Keep components accessible (ARIA labels, keyboard nav)

### Custom Components

- Build reusable sections in `src/components/sections/`
- Create full templates in `src/components/templates/`
- Use TypeScript for props
- Make components themeable via props or CSS variables

## Database & ORM

- Use Drizzle ORM for type-safe queries
- Define schemas in `src/lib/db/schema/`
- Use migrations for schema changes
- Include tenant_id in multi-tenant tables

## Deployment

### Docker

- Dockerfile included in `docker/`
- Multi-stage builds for production
- Environment variables via .env or secrets
- Health checks included

### Coolify

- Connect GitHub repository
- Set environment variables in dashboard
- Use Nixpacks or Dockerfile build method
- Enable auto-deploy on push to main

## Testing

- Unit tests for utilities and helpers
- Integration tests for API routes
- E2E tests for critical user flows
- Test multi-tenancy isolation

## Performance

- Use Next.js Image for all images
- Implement proper caching strategies
- Lazy load components when appropriate
- Monitor bundle size
- Optimize database queries

## Security

- Validate all user inputs
- Sanitize content from CMS
- Use environment variables for secrets
- Implement rate limiting on APIs
- Regular dependency updates

## Documentation

- Keep README.md updated
- Document complex logic inline
- Update ROADMAP.md as tasks complete
- Add JSDoc comments for exported functions

## Common Tasks

### Adding a shadcn/ui Component

```bash
pnpm dlx shadcn@latest add [component-name]
```

### Creating a New Payload Collection

1. Create file in `src/payload/collections/`
2. Define collection config with TypeScript
3. Add to Payload config
4. Run migration if needed

### Adding a New Template

1. Create component in `src/components/templates/`
2. Add props interface
3. Use existing sections/components
4. Add to template registry

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Support

For issues or questions:
- Check ROADMAP.md for known issues
- Review documentation in `docs/`
- Open GitHub issue for bugs or feature requests
