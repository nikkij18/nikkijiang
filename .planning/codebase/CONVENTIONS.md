# CONVENTIONS.md — Code Conventions
*Last mapped: 2026-04-22*

## Language & Types
- TypeScript strict mode — all files must typecheck
- Explicit return types on exported functions optional (inferred)
- Props typed inline where simple, interface/type for complex shapes
- `React.ReactNode` for children prop type

## Component Style
- **Functional components only** — no class components
- **Default exports** for page-level and component files
- Named constant for static data arrays (e.g., `const LINKS = [...]`)
- No explicit `React` import needed (react-jsx transform)

## Example pattern — component:
```tsx
// components/NavBar.tsx
import Link from "next/link";

const LINKS = ["About", "Projects", "Blogs"];

export default function NavBar() {
  return (
    <nav ...>
      {LINKS.map(link => (
        <Link key={link} href={`/${link.toLowerCase()}`}>
          {link}
        </Link>
      ))}
    </nav>
  );
}
```

## Styling
- Tailwind utility classes as primary styling method
- `clamp()` in inline `style` prop for fluid typography (large display text)
- No CSS Modules, no Sass
- Class names: long Tailwind chains written inline, no extraction to variables
- Color palette: neutral-900, neutral-500, neutral-200 (grayscale-dominant design)

## File Organization
- One component per file
- Components live in `components/` at root (not colocated with pages)
- `app/` contains only Next.js routing files (page.tsx, layout.tsx, globals.css)

## Import Order (observed)
1. Next.js built-ins (`next/image`, `next/link`, `next/font/google`)
2. React (if needed)
3. Local components (`@/components/...`)
4. Local styles

## Formatting
- 2-space indentation
- Double quotes for JSX attributes
- Trailing commas in multi-line objects/arrays
- No semicolons at end of JSX (standard Next.js scaffold style)

## Error Handling
- No error handling currently (static site, no async operations)
- Future: use Next.js `error.tsx` files for route-level error boundaries

## Comments
- Minimal inline comments, only for layout clarification
- Example: `{/* Big split typography — sits behind the photo */}`
