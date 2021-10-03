# Frontend practice

Currently I am doing [Frontend Mentor](https://www.frontendmentor.io/) challenges. You can find my solutions at [my profile](https://www.frontendmentor.io/profile/alex-kim-dev). Feel free to leave a comment or give it a like.

This is a monorepo - a single git repository shared by a number of projects. All the solutions are located in the `projects` directory.

## Built with

- Npm workspaces - managing dependencies
- Lerna - a monorepo manager
- ESLint, Stylelint, Prettier - linting & formatting
- Husky, Lint Staged - cleaning code before each commit
- Commitizen, Commitlint - following conventional commits spec

To find out which libraries/frameworks are used in a particular project check its `package.json` or readme.

## Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [Npm v7](https://github.blog/2020-10-13-presenting-v7-0-0-of-the-npm-cli/)

Npm v7 comes with Node.js v15+, so if you have a previous version of Node make sure Npm is updated to v7.

## Run locally

1. Get the repo

```shell
git clone https://github.com/alex-kim-dev/frontend-practice.git
```

2. Install dependencies

```shell
cd frontend-practice
npm ci
```

3. Run development server for a particular project

```shell
npm run -w <project> start
# or
cd projects/<project>
npm start
```

You can find the project names inside `projects` directory or by executing `npm run list`.

## Scripts

The scripts in the root `package.json` work for all projects but must be invoked from the repo root. Also there are some scripts in each projects' `package.json`.
