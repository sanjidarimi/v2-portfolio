# Portfolio Development Skill

## 1. Project Overview

Build a modern, professional, responsive developer portfolio using:

- **Next.js** (App Router)
- **TypeScript** (Strict mode)
- **Tailwind CSS**
- **Lucide React** (Icons)
- **gsap and framer motion** (Animations when needed)

The portfolio should communicate technical expertise, showcase projects, highlight professional experience, and make it easy for potential clients or employers to get in touch.

## 2. Technology Stack

- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- Animation: gsap and Framer Motion
- Fonts: Next.js Font Optimization
- Deployment: Vercel

## 3. Development Standards

### TypeScript

- Always use TypeScript.
- Enable strict type checking.
- Never use `any`.
- Define reusable interfaces and types.
- Avoid unnecessary type assertions.
- Keep components properly typed.

### Next.js

- Use the App Router.
- Prefer Server Components by default.
- Use Client Components only when interactivity or browser APIs are required.
- Use Next.js Image for image optimization.
- Use Next.js Link for internal navigation.
- Follow Next.js metadata and SEO conventions.
- Keep routing and layouts organized.

### React

- Build reusable and composable components.
- Follow React best practices.
- Extract complex logic into custom hooks.
- Avoid unnecessary re-renders.
- Keep components focused on a single responsibility.

### Tailwind CSS

- Use utility-first styling.
- Maintain consistent spacing and typography.
- Prefer reusable component styles.
- Use responsive design utilities.
- Support dark and light themes when required.
- Avoid unnecessary custom CSS.

## 4. UI/UX Guidelines

- Create a clean, modern, and minimal interface.
- Prioritize visual hierarchy and readability.
- Use consistent spacing, colors, and typography.
- Ensure responsive layouts across mobile, tablet, and desktop.
- Use subtle transitions and meaningful animations.
- Maintain accessibility and keyboard navigation.
- Avoid excessive animations and visual clutter.
- Provide clear hover, focus, and active states.
- Use a consistent design system.

## 5. Portfolio Sections

The portfolio should include:

1. **Hero Section**
   - Name and professional title.
   - Short introduction.
   - Primary call-to-action.
   - Social profile links.

2. **About Me**
   - Professional introduction.
   - Development background.
   - Career goals.

3. **Skills & Technologies**
   - Frontend technologies.
   - Backend technologies.
   - Tools and development workflow.

4. **Projects**
   - Featured projects.
   - Project descriptions.
   - Technology stacks.
   - Live demo and GitHub links.

5. **Experience**
   - Professional experience.
   - Responsibilities.
   - Key achievements.

6. **Education**
   - Academic background.
   - Relevant certifications.

7. **Contact**
   - Contact information.
   - Social media links.
   - Contact form with validation.

## 6. Code Architecture

- Organize components by feature or responsibility.
- Keep shared components inside a common components directory.
- Separate data from presentation.
- Use reusable UI components.
- Keep business logic outside presentation components when possible.
- Use meaningful file and variable names.

Suggested structure:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── not-found.tsx
│
├── components/
│   ├── layout/
│   ├── sections/
│   ├── shared/
│   └── ui/
│
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── experience.ts
│
├── hooks/
├── lib/
├── types/
└── config/
```

## 7. Performance & SEO

- Optimize images and assets.
- Minimize unnecessary JavaScript.
- Use dynamic imports when appropriate.
- Maintain good Core Web Vitals.
- Add page metadata.
- Use semantic HTML.
- Implement Open Graph metadata.
- Ensure accessible color contrast.

## 8. Quality Assurance

- Avoid TypeScript errors.
- Avoid ESLint warnings.
- Test responsive layouts.
- Check navigation and external links.
- Validate forms.
- Test accessibility.
- Ensure production builds successfully.

## 9. Important Rules

- Never use TypeScript `any`.
- Never duplicate components unnecessarily.
- Never sacrifice accessibility for visual design.
- Never overcomplicate simple functionality.
- Avoid hardcoded repeated data.
- Do not install unnecessary dependencies.
- Do not introduce features without understanding their requirements.
- Maintain clean, readable, and maintainable code.

## 10. Final Goal

Deliver a professional developer portfolio that is:

- Modern and visually appealing.
- Fully responsive.
- Fast and accessible.
- SEO-friendly.
- Easy to maintain and extend.
- Built with clean, scalable code.
