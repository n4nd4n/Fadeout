# FadeOut Static Landing Page

A modern, fast, and responsive promotional website for the **FadeOut** app ecosystem, built with **Next.js** (App Router), **React 19**, **Framer Motion**, and **Tailwind CSS v4**.

This website serves as the landing page, introducing the core concepts of FadeOut (Temporary Spaces, Private Conversations, and Shared Event Galleries) and providing quick access points to download the FadeOut application on the App Store and Google Play Store.

---

## 📁 Directory Structure & Components

Here is a breakdown of the folder structure and files within this directory:

### 1. `app/` (Next.js App Router & Global Configs)
- **`layout.tsx`**: Defines the root layout structure, applies the custom font, and handles SEO meta-tags (title, description, and OpenGraph/Twitter social media preview configurations).
- **`page.tsx`**: The main entry point for the landing page. It acts as the orchestrator, pulling together the structured layout of all sections in order: `Navbar`, `Hero`, `Features`, `Timeline`, `InviteSection`, and `CTASection`, ended by the `Footer`.
- **`globals.css`**: Contains global Tailwind directive imports (`@import "tailwindcss"`), defines the theme system (`@theme`) mapped with custom design tokens (colors, font, border radii), and manages custom utility classes like customized slim scrollbars (`.scrollbar-thin`).
- **`favicon.ico`**: The browser tab icon asset.

### 2. `components/` (React Components & Modals)
The components are designed cleanly with Framer Motion animations to make the UI engaging and interactive:
- **`Navbar.tsx`**: Sticky top navigation bar supporting desktop layout, mobile drawer menu, App Store/Play Store CTAs, and triggering state-based overlays for modal views.
- **`Hero.tsx`**: High-impact above-the-fold introductory section presenting the brand message ("Moments fade. Memories stay.") with clean typography and layout.
- **`Features.tsx`**: Spotlights the three core features of the FadeOut app (Temporary Spaces, Private Chat, Event Galleries) using interactive hover cards.
- **`Timeline.tsx`**: Visualizes "How it Works" in a step-by-step connection flow (Steps 1 to 5) with left/right alternating alignment on desktop screens.
- **`InviteSection.tsx`**: User-friendly input box inviting users to paste their private RSVP links to open event spaces directly.
- **`CTASection.tsx`**: A call-to-action banner promoting mobile app downloads.
- **`Footer.tsx`**: Standardized footer showcasing attribution and copyright info.

#### Modals (in `components/`)
- **`AboutModal.tsx`**: Full-overlay modal introducing the mission behind FadeOut, why it exists, and contact info (`support@fadeoutapp.com`).
- **`PrivacyModal.tsx`**: Comprehensive modal listing data privacy, storage, and retention details.
- **`TermsModal.tsx`**: Terms & Conditions modal covering usage agreements, liabilities, and guidelines.

#### UI Primitives (in `components/ui/`)
- **`Button.tsx`**: Reusable interactive button built on top of `framer-motion`'s `<motion.button>` containing built-in hover and active tap micro-animations, supporting presets like `primary`, `dark`, `outline`, and `ghost`.
- **`FeatureCard.tsx`**: The card design wrapper used in features list grid.
- **`SectionTitle.tsx`**: Consistent section header element.
- **`TimelineStep.tsx`**: Timeline node rendering step indicators, numbers, and descriptive texts, dynamically responsive for mobile (vertical stacked) vs desktop (alternating layout) views.

### 3. `public/` (Static Assets)
- SVG icons (`apple.svg`, `playstore.svg`, `globe.svg`, `window.svg`, `file.svg`, `next.svg`, `vercel.svg`).
- Graphic assets used within the backgrounds (`event_crowd.png`, logo, stars decoration).

### 4. Root Configuration Files
- **`package.json`**: Lists all npm commands and core dependencies (Next.js v16.2, React 19, Framer Motion v12, Tailwind CSS v4, Lucide React).
- **`tsconfig.json`**: TypeScript project configurations, module resolving, and paths alias definitions (`@/*`).
- **`next.config.ts`**: Configuration for building and serving the Next.js application.
- **`postcss.config.mjs`**: Configuration file specifying PostCSS setup for compiling Tailwind CSS.
- **`eslint.config.mjs`**: Code styling and quality rules.
- **`AGENTS.md` & `CLAUDE.md`**: Specialized developer context documents.

---

## 🛠️ Setup & Local Development Instructions

### Prerequisites
Make sure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher is recommended)
- **npm** (comes with Node.js) or **yarn** / **pnpm** / **bun**

### 1. Install Dependencies
Navigate to this directory (`fadeout_static`) in your terminal and run:
```bash
npm install
```

### 2. Run the Development Server
To start the hot-reloading development server, run:
```bash
npm run dev
```

Once the server has successfully spun up, open [http://localhost:3000](http://localhost:3000) in your web browser to view the landing page.

### 3. Linting Check
To check your code for formatting and styling rules:
```bash
npm run lint
```

### 4. Build for Production
To build an optimized production bundle of the website:
```bash
npm run build
```

To run the production build locally (preview server):
```bash
npm run start
```

---

## ✨ Key Technology & Styling Features

- **Tailwind CSS v4**: Utilizes the new CSS-first syntax with the `@theme` directive inside `app/globals.css`. Custom variables/colors (`--color-primary`, `--color-dark-text`, etc.) are exposed directly into Tailwind utility classes.
- **React 19 & Next.js App Router**: Utilizes modern React features with server-first rendering by default for maximum performance, while opting components that need state (like Navbar, Button, and Modals) into client-side interactivity using `"use client"`.
- **Framer Motion Micro-animations**:
  - Button hover scaling (`scale: 1.02`) and click transitions (`scale: 0.98`).
  - Spring-based entrance animations on modals and overlays.
  - Scroll-linked viewport entrance animations for timeline elements via `whileInView` and `viewport` configurations.
- **SEO Optimization**: Standardized `metadata` exports inside `app/layout.tsx` targeting both desktop web and social media crawlers (OpenGraph / Twitter card previews).
- **Responsive Layout**: Fluid UI resizing via grid and flexbox arrangements, switching layouts intelligently between mobile phone viewports and desktop resolutions.
