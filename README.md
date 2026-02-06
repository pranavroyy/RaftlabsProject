# Programming Concepts Guide

A server-side rendered Next.js application demonstrating programmatic SEO using dynamic routes, structured metadata, and SEO-friendly architecture.

## Overview

This project showcases how to build an SEO-optimized, content-driven website using Next.js Pages Router and server-side rendering. The focus is on scalability, clean structure, and search engine visibility.

Key features:
- Server-side rendering (SSR)
- Programmatic SEO with dynamic pages
- JSON-LD structured data
- OpenGraph and Twitter metadata
- Dynamic sitemap generation
- Semantic and responsive UI

## Content Scope

The application covers fundamental programming topics including:
- Algorithms (Recursion, Dynamic Programming, Binary Search, Big O)
- JavaScript concepts (Async/Await, Closures, Event Loop)
- Backend fundamentals (REST APIs)
- Design principles (SOLID, Dependency Injection)

Each page provides explanations, examples, and common pitfalls.

## SEO Highlights

- Dynamic meta titles and descriptions
- Canonical URLs and robots directives
- Article and Website schema using JSON-LD
- Server-rendered content for better crawlability
- Auto-generated sitemap.xml

## Project Structure

```

nextjs-seo-demo/
├── data/
│   └── concepts.json
├── pages/
│   ├── index.tsx
│   ├── sitemap.xml.tsx
│   └── concepts/[slug].tsx
├── public/robots.txt
├── styles/globals.css
├── package.json
└── next.config.js

````

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/pranavroyy/RaftlabsProject.git
cd RaftlabsProject
npm install
npm run dev
````

The application runs at `http://localhost:3000`.

### Production Build

```bash
npm run build
npm start
```

## Key Learnings

This project demonstrates how server-side rendering combined with structured data and programmatic routing improves SEO, scalability, and content discoverability.

## Future Improvements

* Search functionality
* Interactive examples
* Blog expansion
* Internationalization support
