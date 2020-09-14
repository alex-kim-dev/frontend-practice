# Frontend practice / react

A gatsby app containing a number of projects made for practice.

## Tech stack

- Static site generator: GatsbyJS
- Frontend framework: React
- Linting: Eslint, Prettier
- Testing: Jest
- Checks before every commit: Husky & Lint Staged
- Some popular JS libraries

## Directories

- `src/fem/<level>/<challenge>/`: FrontendMentor solutions

## Run locally

```shell
# clone
git clone https://github.com/Alex-K1m/frontend-practice.git

# install
cd frontend-practice
yarn

# start dev server
yarn react start
```

## Scripts

```shell
yarn react build
yarn react serve # starts up a local web server for hosting production build
yarn react clean # cleans public directory and cache
yarn react lint # lints js, jsx
yarn react lint:fix # fixes all fixable problems with js, jsx
yarn react format # checks json, yaml, md formatting
yarn react format:write # formats these files
yarn react test # run all jest tests
yarn react test:watch # watch for changes and re-run tests
```
