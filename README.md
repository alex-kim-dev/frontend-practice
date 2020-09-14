# Frontend practice

Currently I am doing [Frontend Mentor](https://www.frontendmentor.io/) challenges. You can find my solutions at [my profile](https://www.frontendmentor.io/profile/Alex-K1m). Feel free to leave a comment or give it a like.

This is a monorepo that contains 2 sets of solutions:

- **`/no-framework`**: built using Pug, SCSS, plain JS
- **`/react`**: built using GatsbyJS, React, + libraries

Each set is a workspace inside the monorepo, and it has its own `package.json` and a number of scripts included. To execute a script for a particular workspace use `yarn <workspace> <script>`. The workspace names are:

- `nofr` for plain js solutions
- `react` for gatsby-react solutions

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
yarn
```

3. Run `start` script for a particular workpace

```shell
yarn nofr start # no framework solutions
yarn react start # gatsby react solutions
```
