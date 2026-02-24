# Omens

A static website project built with Vite, using Handlebars for templating and GSAP for animations. The project supports internationalization (English and Japanese).

## Features

- **Vite**: Fast development server and optimized build process.
- **Handlebars**: Templating engine for reusable HTML components (partials).
- **Internationalization (i18n)**: Content management via JSON files (`locales/`) for English and Japanese versions.
- **GSAP**: High-performance animations.
- **Modern Normalize**: Consistent styling across browsers.

## Project Structure

- `src/partials/`: Reusable Handlebars partials (e.g., header, footer).
- `locales/`: JSON files containing text content for different languages (`en.json`, `ja.json`).
- `index.html`: Main entry point (English version).
- `ja/index.html`: Japanese version entry point.
- `vite.config.js`: Vite configuration, including Handlebars plugin setup and build options.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd omens
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### Build

Build the project for production:

```bash
npm run build
```

The output files will be in the `dist` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```
