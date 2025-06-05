# dhi13man-portfolio

A personal portfolio website showcasing the achievements, ventures, work experiences, and projects of Dhiman Seal.

Live demo: [dhimanseal.com](https://dhimanseal.com)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Pages](#pages)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

This static website serves as an online portfolio for Dhiman Seal, highlighting professional achievements, educational background, work experiences, technical projects, recommendations, and entrepreneurial ventures.

## Features

- Responsive design for desktop and mobile devices
- Sidebar navigation with active state indication
- Dynamic content loaded from JSON data files
- SEO-friendly markup with structured data (JSON-LD)
- Image optimization and lazy loading for performance
- Accessible and keyboard navigable

## Technologies

- HTML5 & CSS3 (Flexbox, Grid)
- JavaScript (ES6 Modules)
- JSON-LD for structured data (`src/assets/data/ld.json`)
- No external JS frameworks (vanilla JS)
- Organized CSS with global, component, and page-level styles

## Pages

- **Home** (`index.html`): Introduction and quick navigation.
- **About** (`about.html`): Personal bio and mission.
- **Achievements**: Awards, certifications, and milestones.
- **Education**: Academic background and honors.
- **Experiences**: Professional roles and responsibilities.
- **Projects**: Technical projects with details and links.
- **Recommendations**: Testimonials and endorsements.
- **Ventures**: Entrepreneurial initiatives and startup work.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/dhimanseal/dhi13man-portfolio.git
cd dhi13man-portfolio
```

Serve locally:

```bash
# Python 3
python3 -m http.server 8000

# Or with npm
npm install -g serve
serve .
```

Open `src/index.html` in your browser or navigate to `http://localhost:8000`.

## Development

- Edit HTML pages in `src/`.
- Update styles in `styles/`.
- Modify or add JavaScript in `scripts/`.
- Manage assets under `src/assets/`.
- For JSON data changes, edit files in `scripts/data/` and run `private/data_sorter.py`.

## Deployment

Use GitHub Pages, Netlify, or any static hosting. Pushing to `main` branch triggers deployment if configured.

## Contributing

Contributions welcome! Fork the repo, create a branch, and submit a pull request. Please open an issue for major changes.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
