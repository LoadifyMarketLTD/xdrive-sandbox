# xDrive Sandbox

A Next.js project with Tailwind CSS and internationalization (i18n) support.

## Features

- ⚡ Next.js 13 with React 18
- 🎨 Tailwind CSS for styling
- 🌍 i18n support for 4 languages (English, French, German, Romanian)
- 🔧 ESLint for code linting
- 🚀 Ready for deployment

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Internationalization

The application supports 4 locales:
- English (en) - default
- French (fr)
- German (de)
- Romanian (ro)

Translation files are located in `public/locales/[locale]/common.json`.

## Project Structure

```
xdrive-sandbox/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── pages/
│   ├── api/
│   │   └── hello.js
│   ├── _app.js
│   └── index.js
├── public/
│   └── locales/
│       ├── en/
│       ├── fr/
│       ├── de/
│       └── ro/
├── styles/
│   └── globals.css
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```
