# HTML templates

A set of html templates that i make for practicing core web coding skills.

Currently i am doing [Frontend Mentor](https://www.frontendmentor.io/) challenges. You can find my solutions at [my profile](https://www.frontendmentor.io/profile/Alex-K1m). Feel free to leave a comment or give it a like.

### Tech stack

- Task runner: Gulp
- Dev server: BrowserSync + hot reloading
- Template engine: Pug
- Stylesheets: Sass + combining media queries, autoprefixer, minification, inlining into html file
- Javascript: Browserify + Babel + minification
- Keeping code tidy: Eslint, Stylelint, Prettier + Husky & LintStaged for linting before every commit

### Directories

- `src/fm-challenges/<level>/<challenge>/`: FrontendMentor solutions
- `src/includes/`: some reusable parts (markup, styles, anything)
  - `/layout.pug`: wrapper for each fm challenge

### Run locally

1. Clone repo
  ```bash
  git clone https://github.com/Alex-K1m/html-templates.git
  ```

2. Install dependencies
  ```bash
  npm install
  ```

3. Run dev server
  ```bash
  npm start
  ```

#### Other commands

```bash
npm run build
npm run serve # starts up a local web server for hosting production build
npm run clean:dev # deletes development build
npm run clean:prod # deletes production build
npm run lint # checks for code styling issues
npm run fix # fixes all fixable code styling issues (changes files)
```
