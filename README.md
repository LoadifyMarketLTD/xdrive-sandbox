# xdrive-sandbox

A logistics marketplace demo application built with Next.js, React, and Tailwind CSS. This sandbox environment demonstrates modern web development practices including internationalization, API integration, and responsive design.

## Features

- **Next.js 13** - React framework with server-side rendering
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **i18n Support** - Multi-language support (English, French, German, Romanian)
- **API Routes** - Backend API endpoints
- **CI/CD** - GitHub Actions workflow for automated testing and builds

## Tech Stack

- Next.js 13.5.6
- React 18.2.0
- Tailwind CSS 3.3.5
- PostCSS & Autoprefixer
- ESLint

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LoadifyMarketLTD/xdrive-sandbox.git
cd xdrive-sandbox
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Testing Locales

The application supports 4 locales: English (en), French (fr), German (de), and Romanian (ro).

To test different locales:
1. Run the development server (`npm run dev`)
2. Use the language switcher in the navigation bar
3. Or access directly via URL:
   - English: http://localhost:3000/
   - French: http://localhost:3000/fr
   - German: http://localhost:3000/de
   - Romanian: http://localhost:3000/ro

## Project Structure

```
xdrive-sandbox/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── components/
│   └── LanguageSwitcher.js
├── pages/
│   ├── api/
│   │   └── hello.js
│   ├── _app.js
│   ├── index.js
│   └── about.js
├── public/
│   └── locales/
│       ├── en/common.json
│       ├── fr/common.json
│       ├── de/common.json
│       └── ro/common.json
├── styles/
│   └── globals.css
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## API Endpoints

- `/api/hello` - Sample API endpoint that returns JSON with timestamp and locale information

## Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the project's coding standards
- [ ] All tests pass (`npm run build` succeeds)
- [ ] ESLint shows no errors (`npm run lint`)
- [ ] New features include appropriate documentation
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with the base branch
- [ ] No unrelated changes are included
- [ ] Localization files are updated if UI text changes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
