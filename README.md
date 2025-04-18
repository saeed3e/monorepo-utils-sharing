# Sharing Monorepo Utilities in External Projects

This repository demonstrates how to leverage utility functions from a Yarn workspace monorepo in a completely separate project. This approach enables code reuse across project boundaries while maintaining the independence of each project.

## Repository Structure

- **yarn-workspace-project/**: A monorepo with Yarn workspaces
  - **packages/utils/**: Reusable utility functions package
- **project-x_using-yarn-workspace-module/**: A standalone Vite React application that consumes the utils package

## How Code Sharing Works

We use npm package publishing techniques to make the utils package from our monorepo available to external projects. This approach:
- Eliminates code duplication across projects
- Provides proper versioning for shared code
- Maintains TypeScript type definitions for type safety
- Works seamlessly in both development and production environments

## Package Configuration

The `utils` package in `yarn-workspace-project/packages/utils` is configured as a publishable npm package:

```json
{
  "name": "@your-org/utils",
  "version": "1.0.0",
  "private": false,
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "publishConfig": {
    "access": "public"
  }
}
```

## Development Workflow

### 1. Build the Package

```bash
# Navigate to the utils package
cd yarn-workspace-project/packages/utils

# Build the package using Yarn
yarn build
```

This command executes the build script defined in the package.json, which uses modern ES6 module formats (ESM and CJS) and generates TypeScript declaration files.

### 2. Create a Local Tarball

```bash
# Create a tarball for local development
yarn pack
```

This creates a file like `your-org-utils-1.0.0.tgz` that can be installed locally, containing the compiled ES6 modules.

### 3. Install in the Target Project

In your target project's `package.json`, reference the local tarball:

```json
"dependencies": {
  "@your-org/utils": "../yarn-workspace-project/packages/utils/your-org-utils-1.0.0.tgz"
}
```

Then install dependencies using Yarn:

```bash
cd project-x_using-yarn-workspace-module
yarn install
```

### 4. Use the Shared Code

```typescript
import { generateId } from '@your-org/utils';

// Use the function
const newId = generateId();
```

### 5. Update During Development

When you make changes to the utils package during development:

1. Make your changes in `yarn-workspace-project/packages/utils`
2. Rebuild the package: `yarn build`
3. Create a new tarball: `npm pack`
4. Reinstall in the target project: `yarn install`

## Production Deployment

The local tarball approach **will not work in production**. For production deployment:

### 1. Publish to npm Registry

```bash
# Navigate to the utils package
cd yarn-workspace-project/packages/utils

# Ensure code follows strict ES6 standards
yarn lint

# Publish to npm registry using Yarn
yarn publish
```

### 2. Update Dependencies for Production

Update your `package.json` to use the published version with semantic versioning:

```json
"dependencies": {
  "@your-org/utils": "^1.0.0"
}
```

Then install dependencies from the registry using Yarn:

```bash
yarn install
```

This ensures that your production environment uses the properly versioned and published package.

## Benefits of This Approach

- **Code Reusability**: Eliminates duplication by maintaining utilities in a single source of truth
- **Modular Architecture**: Follows best practices with clear separation of concerns
- **ES6 Standards**: Uses modern JavaScript features and module systems
- **Strict Type Safety**: Leverages TypeScript for robust type checking across projects
- **Defensive Programming**: Properly encapsulated utilities with consistent interfaces
- **Maintainable Codebase**: Changes to utilities only need to be made in one place
- **Versioning Control**: Semantic versioning helps manage dependencies and breaking changes
- **Production Ready**: Works seamlessly in both development and production environments
- **Independent Deployment**: Each project can be developed and deployed on its own schedule

## License

MIT
