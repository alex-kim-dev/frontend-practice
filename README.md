# Frontend practice

Currently I am doing [Frontend Mentor](https://www.frontendmentor.io/) challenges. You can find my solutions at [my profile](https://www.frontendmentor.io/profile/Alex-K1m). Feel free to leave a comment or give it a like.

This is a monorepo - a single git repository shared by a number of projects. All the solutions are located in the `projects` directory.

## Built with

- Yarn workspaces - managing dependencies
- Lerna - a monorepo manager
- ESLint, Stylelint, Prettier - linting & formatting
- Husky, Lint Staged - cleaning code before each commit
- Commitizen, Commitlint - following conventional commits spec

To find out which libraries/frameworks are used in a particular project check its `package.json` or readme.

## Prerequisites

- [NodeJS](https://nodejs.org/en/)
- [Yarn v1](https://classic.yarnpkg.com/en/):

## Run locally

1. Get the repo

```shell
git clone https://github.com/Alex-K1m/frontend-practice.git
```

2. Install dependencies

```shell
cd frontend-practice
npx lerna bootstrap
```

3. Run development server for a particular project

```shell
yarn workspace <project> start
# or
cd projects/<project>
yarn start
```

You can find the project names inside `projects` directory or by executing `yarn run list`.

## Scripts

The scripts in the root `package.json` work for all projects but must be invoked from the repo root. Also there are some scripts in each projects' `package.json`.
