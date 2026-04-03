# Modern Next.js Turborepo Stack

A high-performance monorepo scaffolded with the latest web technologies for building interactive, 3D-enabled applications.

## 🚀 Features

- **Turborepo**: Blazing fast monorepo management with intelligent caching.
- **Next.js 16**: Using the App Router and cutting-edge features.
- **pnpm**: Fast, disk-space efficient package management.
- **Tailwind CSS v4**: The latest in utility-first CSS with native cascade layers.
- **TypeScript**: Type safety across the entire codebase.
- **Framer Motion**: Smooth, declarative animations for fluid UIs.
- **Three.js & React Three Fiber**: Interactive 3D graphics integrated seamlessly into React.

---

## 📂 Project Structure

- `apps/home`: The main Next.js application with 3D and animation demos.
- `apps/docs`: Documentation site (Next.js).
- `packages/ui`: Shared React component library.
- `packages/eslint-config`: Shared linting rules.
- `packages/typescript-config`: Shared TypeScript configurations.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (Recommended)

### Installation

```bash
pnpm install
```

### Development

Run the development server for all apps:

```bash
pnpm run dev
```

To develop only the web app:

```bash
pnpm run dev --filter=web
```

---

## 💅 Styling

This project uses **Tailwind CSS v4**. Styles are configured via CSS variables and the `@theme` directive in `apps/web/app/globals.css`.

## 🌌 3D Scenes

Interactive 3D components are located in `apps/web/components/`. They use `@react-three/fiber` and `@react-three/drei` for a robust developer experience.

---

## ⚡ Build & Testing

Build all projects:

```bash
pnpm run build
```

Lint all projects:

```bash
pnpm run lint
```
