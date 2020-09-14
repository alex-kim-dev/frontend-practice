# Frontend practice / no framework

A set of html templates that I make for practicing core web coding skills.

## Tech stack

- Task runner: Gulp
- Dev server: BrowserSync + hot reloading
- Template engine: Pug
- Stylesheets: Sass + combining media queries, autoprefixer, minification, inlining into html file
- Javascript: Browserify + Babel + minification
- Keeping code tidy: Eslint, Stylelint, Prettier + Husky & Lint Staged for linting before every commit

## Directories

- `src/fm-challenges/<level>/<challenge>/`: FrontendMentor solutions
- `src/includes/`: some reusable parts (markup, styles, anything)
  - `/layout.pug`: wrapper for each fm challenge

## Run locally

```shell
# clone
git clone https://github.com/Alex-K1m/frontend-practice.git

# install
cd frontend-practice
yarn

# start dev server
yarn nofr start
```

## Scripts

```shell
yarn nofr build
yarn nofr serve # starts up a local web server for hosting production build
yarn nofr clean:dev # deletes development build
yarn nofr clean:prod # deletes production build
yarn nofr lint # checks for code styling issues
yarn nofr fix # fixes all fixable code styling issues (changes files)
```
