---
description: Basic rules of how to work
globs: 
---
# Frontend Development Rules and Guidelines

## Component Guidelines
- Use TypeScript for all components
- Follow functional component pattern
- Create components with .tsx extension
- Keep components small and focused
- Use proper prop typing
- Implement error boundaries where needed
- Add loading states for async operations
- Follow naming convention: PascalCase for components

## State Management
- Use React Query for server state
- Implement Zustand for client state
- Keep state logic in separate stores
- Use local state for component-specific data
- Implement proper loading and error states

## Styling
- Use Tailwind CSS for styling
- Follow mobile-first approach
- Create reusable utility classes
- Keep custom CSS in `src/styles` directory
- Use CSS modules when needed
- Follow color scheme:
  - Primary: Deep purple (#6D28D9)
  - Secondary: Teal (#0D9488)
  - Background: Dark/Light mode compatible
  - Text: Accessible contrast ratios

## API Integration
- Create typed API clients
- Use environment variables for API URLs
- Implement proper error handling
- Add request/response interceptors
- Cache API responses appropriately
- Follow REST API best practices
- Use JWT for authentication

## Authentication
- Implement JWT token management
- Store tokens securely
- Handle token refresh
- Implement protected routes
- Add role-based access control
- Handle session expiration

## Performance
- Implement proper code splitting
- Use Next.js Image component
- Optimize bundle size
- Implement proper caching strategies
- Use React Suspense boundaries
- Implement progressive loading
- Monitor performance metrics

## Error Handling
- Create global error boundary
- Implement toast notifications
- Log errors appropriately
- Show user-friendly error messages
- Handle network errors gracefully
- Implement retry mechanisms

## Testing
- Write unit tests for components
- Implement integration tests
- Use React Testing Library
- Follow TDD when possible
- Maintain good test coverage
- Mock API calls in tests

## Code Quality
- Use ESLint for code linting
- Implement Prettier for formatting
- Follow consistent naming conventions
- Write meaningful comments
- Create proper documentation
- Use TypeScript strictly

## Security
- Implement CSRF protection
- Sanitize user inputs
- Handle sensitive data properly
- Follow OWASP guidelines
- Implement rate limiting
- Use secure HTTP headers

## Accessibility
- Follow WCAG guidelines
- Use semantic HTML
- Implement proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain proper contrast ratios

## Git Workflow
- Follow conventional commits
- Create meaningful PR descriptions
- Keep PRs focused and small
- Add proper documentation
- Review code thoroughly
- Maintain clean git history

## Deployment
- Use proper CI/CD pipeline
- Implement staging environment
- Add environment checks
- Monitor application health
- Implement proper logging
- Use proper build optimization

## Feature-Specific Guidelines

### Competition Management
- Implement real-time updates
- Show loading states during operations
- Handle concurrent edits
- Implement proper validation
- Add confirmation dialogs
- Show success/error feedback

### User Management
- Handle role-based access
- Implement proper form validation
- Show password requirements
- Handle session management
- Implement proper logout
- Add account recovery

### Results & Scoring
- Show real-time updates
- Implement proper sorting
- Add filtering capabilities
- Show proper statistics
- Handle tie-breaks
- Implement proper caching

### Analytics
- Use proper charting library
- Implement data caching
- Show loading states
- Handle large datasets
- Add export functionality
- Implement proper filters

## Dependencies
Required packages:
- next: ^14.0.0
- react: ^18.0.0
- react-dom: ^18.0.0
- typescript: ^5.0.0
- tailwindcss: ^3.0.0
- @tanstack/react-query: ^5.0.0
- zustand: ^4.0.0
- axios: ^1.0.0
- jwt-decode: ^4.0.0
- react-hook-form: ^7.0.0
- zod: ^3.0.0
- date-fns: ^2.0.0
- recharts: ^2.0.0

## File Naming Conventions
- Components: PascalCase (e.g., CompetitionCard.tsx)
- Hooks: camelCase with use prefix (e.g., useAuth.ts)
- Utils: camelCase (e.g., dateFormatter.ts)
- Types: PascalCase with type suffix (e.g., CompetitionType.ts)
- Constants: UPPER_SNAKE_CASE
- API: camelCase (e.g., competitionApi.ts)

## Component Template
```tsx
import { FC } from 'react';
import { ComponentProps } from '@/types';

export const Component: FC<ComponentProps> = ({ prop1, prop2 }) => {
  return (
    <div>
      {/* Component content */}
    </div>
  );
};
```

## API Call Template
```typescript
import { axiosInstance } from '@/lib/axios';
import { ApiResponse, RequestData } from '@/types';

export const apiCall = async (data: RequestData): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post('/endpoint', data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
```

Remember to follow these guidelines to maintain consistency and quality across the frontend codebase. These rules should be reviewed and updated as needed based on project requirements and team feedback.
