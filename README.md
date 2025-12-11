# xDrive Sandbox

A Next.js demo project with Tailwind CSS and internationalization (i18n) support.

## Features

- ⚡ Next.js 13 with React 18
- 🎨 Tailwind CSS for styling
- 🌍 i18n support for multiple locales (English, French, German, Romanian)
- 🔌 API endpoints
- ✅ ESLint configuration
- 🚀 CI/CD workflow with GitHub Actions

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/LoadifyMarketLTD/xdrive-sandbox.git
   cd xdrive-sandbox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Testing Locales

The application supports four locales:
- English (en) - default: `http://localhost:3000`
- French (fr): `http://localhost:3000/fr`
- German (de): `http://localhost:3000/de`
- Romanian (ro): `http://localhost:3000/ro`

Locale files are located in `/public/locales/{locale}/common.json`

## API Endpoints

- `/api/hello` - Demo API endpoint

## Pull Request Checklist

Before submitting a pull request, please ensure:

- [ ] Code follows the project's style guidelines
- [ ] All tests pass locally
- [ ] ESLint shows no errors (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] New features include appropriate documentation
- [ ] Commits are atomic and have clear messages
- [ ] Branch is up to date with the base branch
- [ ] All CI checks pass

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
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## License

This project is created for demonstration purposes.
