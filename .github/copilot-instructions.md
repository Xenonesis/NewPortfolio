# Copilot Instructions for Aditya's Portfolio Website

## Core Commands
- **Lint CSS:** `npm run lint:css`
- **Lint HTML:** `npm run lint:html`
- **Lint JS:** `npm run lint:js`
- **Release Tag:** `git tag -a v<version> -m "Release version <version>" && git push --tags`
- **Compare Versions:** `git log v<old>..v<new>`, `git diff v<old>..v<new>`

## High-Level Architecture
- **Frontend:** HTML5, CSS3 (with TailwindCSS), JavaScript
- **Features:**
  - Chatbot (PDF.js for PDF parsing)
  - Testimonials carousel
  - Animated skills/progress bars
  - Projects grid, achievements, certifications, contact form
- **No backend or database**; all data is static or client-side.
- **Accessibility:** Follows WAI-ARIA, WCAG 2.2, semantic HTML, keyboard navigation, color contrast.

## Style Rules
- **Naming:** camelCase for JS, kebab-case for CSS classes/files
- **Formatting:**
  - Use semantic HTML
  - Consistent indentation (2 spaces or as per file)
  - Use ARIA roles for interactive elements
- **Imports:**
  - Use ES6 imports if modules are used (rare; mostly vanilla JS)
- **Typing:**
  - No TypeScript; JS is untyped
- **Error Handling:**
  - Use `try/catch` for async or risky JS
  - Validate user input in forms
- **Security:**
  - All `target="_blank"` links must include `rel="noopener"`

## Documentation & Contributions
- Keep comments and documentation concise and up to date
- Pull requests: add/remove contributors by commenting `+@github_username` or `-@github_username`

## Agent Rules
- No `.cursor`, `.cursorrules`, `AGENTS.md`, `CLAUDE.md`, `.windsurfrules`, or previous Copilot instructions found
- Follow only the rules in this file and the README

## Other Notes
- Do not invent commands, services, or architecture not present in the repo
- Do not list all files; focus on structure and rules
- For more, see the README
