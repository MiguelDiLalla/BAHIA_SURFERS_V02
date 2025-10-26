# Configuration Guide

This document provides an overview of all configuration files in the Bahia Surfers Radio project.

## 📦 Core Configuration Files

### `package.json`
Main project manifest containing:
- Project metadata and version
- Dependencies (React, Radix UI, etc.)
- Dev dependencies (TypeScript, ESLint, Prettier, Tailwind)
- NPM scripts for development workflow

**Key Scripts:**
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run format      # Format code with Prettier
npm run type-check  # Check TypeScript types
```

---

### `tsconfig.json`
TypeScript configuration for the application:
- **Target:** ES2020
- **Module:** ESNext with bundler resolution
- **Strict mode:** Enabled for type safety
- **Path aliases:** `@/*` maps to `./src/*`

### `tsconfig.node.json`
Separate TypeScript config for Node.js files (Vite config, etc.)

---

### `vite.config.ts`
Vite bundler configuration:
- React plugin with SWC (fast compilation)
- Path aliases matching TypeScript config
- Development server on port 3000
- Build output to `/build` directory

---

### `tailwind.config.ts`
Tailwind CSS configuration:
- **Content paths:** Scans `index.html` and all files in `src/`
- **Custom colors:** Brand colors using CSS variables
- **Theme extensions:** Custom fonts, border radius, animations
- **Dark mode:** Class-based dark mode support

**Key Features:**
- Integration with shadcn/ui color system
- Custom CSS variables from `src/index.css`
- Responsive design utilities

---

### `postcss.config.js`
PostCSS configuration for CSS processing:
- **Tailwind CSS:** Processes Tailwind directives
- **Autoprefixer:** Adds vendor prefixes for browser compatibility

---

## 🎨 Code Quality & Formatting

### `.eslintrc.json`
ESLint configuration for code linting:
- React, TypeScript, and JSX accessibility rules
- Automatic React version detection
- Custom rule overrides for unused variables

### `.prettierrc.json`
Prettier configuration for code formatting:
- 2-space indentation
- Single quotes for JS/TS
- Semicolons required
- 80 character line width

### `.editorconfig`
Editor-agnostic coding style configuration:
- UTF-8 encoding
- LF line endings
- Trim trailing whitespace
- 2-space indentation

---

## 🔧 Environment Variables

### `.env.example`
Template for environment variables. Copy to `.env` for local development.

**Available Variables:**
- `VITE_API_URL` - API endpoint URL
- `VITE_STREAM_URL` - Radio stream URL
- `VITE_APP_NAME` - Application name
- `VITE_APP_VERSION` - Application version
- `VITE_ENABLE_PWA` - Enable PWA features
- `VITE_ENABLE_ANALYTICS` - Enable analytics

> **Note:** All variables must be prefixed with `VITE_` to be accessible in client code via `import.meta.env`

---

## 🚀 VS Code Integration

### `.vscode/settings.json`
Workspace-specific VS Code settings:
- Format on save with Prettier
- Auto-fix ESLint issues on save
- Tailwind CSS IntelliSense
- File nesting patterns

### `.vscode/extensions.json`
Recommended VS Code extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Path IntelliSense
- React snippets

---

## 📝 Git Configuration

### `.gitignore`
Excludes from version control:
- `node_modules/`
- `build/`, `dist/`
- Environment files (`.env`)
- IDE files
- Log files

---

## 🏗️ Project Structure Best Practices

### Type Definitions
- `vite-env.d.ts` - Vite and environment variable types

### Utilities
- `src/lib/utils.ts` - Common utility functions (e.g., `cn()` for className merging)

---

## 🔄 Development Workflow

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Before committing:**
   ```bash
   npm run type-check  # Check for TypeScript errors
   npm run lint        # Check for linting issues
   npm run format      # Format all files
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm run preview     # Test the production build
   ```

---

## 🧪 Customization Tips

### Adding New Environment Variables
1. Add to `.env.example` with documentation
2. Add type definition in `vite-env.d.ts`
3. Access via `import.meta.env.VITE_YOUR_VAR`

### Adding Tailwind Plugins
```ts
// tailwind.config.ts
export default {
  // ...
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Customizing ESLint Rules
```json
// .eslintrc.json
{
  "rules": {
    "your-rule": "warn" // or "error" or "off"
  }
}
```

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

---

**Last Updated:** October 26, 2025
