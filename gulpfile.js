/* eslint-env node */

'use strict';

const glob = require('glob');
const browserSync = require('browser-sync').create();
const { series, parallel, src, dest, watch } = require('gulp');
const del = require('delete');
const pug = require('gulp-pug');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const siteMeta = require('./src/siteMeta');

const outputDir = 'dev';
const assetsGlob = '!(*.pug|*.scss|*.js)';

// private tasks

const serverStart = done => {
  browserSync.init({
    server: {
      baseDir: outputDir,
    },
    port: 3000,
  });
  done();
};

// const serverReload = done => {
//   browserSync.reload();
//   done();
// };

const clean = done => del([`${outputDir}/**`], done);

const fmChallenges = glob
  .sync('src/fm-challenges/*/')
  .map(path => {
    try {
      const name = path.match(/\/([^/]+)\/$/)[1];
      return { path, name };
    } catch (err) {
      throw new Error(`Can't match the fm challenge directory`);
    }
  })
  .map(({ path, name }) => ({
    path,
    name,
    tasks: {
      [`${name}_markup`]() {
        return src(`${path}/index.pug`)
          .pipe(pug({ locals: siteMeta }))
          .pipe(dest(`${outputDir}/${name}`))
          .pipe(browserSync.stream());
      },
      [`${name}_styles`]() {
        return src(`${path}/styles.scss`, { allowEmpty: true })
          .pipe(sass().on('error', sass.logError))
          .pipe(dest(`${outputDir}/${name}`))
          .pipe(browserSync.stream());
      },
      [`${name}_script`]() {
        return src(`${path}/script.js`, { allowEmpty: true })
          .pipe(
            webpack({ mode: 'development', output: { filename: 'script.js' } }),
          )
          .pipe(dest(`${outputDir}/${name}`))
          .pipe(browserSync.stream());
      },
      [`${name}_assets`]() {
        return src(`${path}/${assetsGlob}`, { allowEmpty: true })
          .pipe(dest(`${outputDir}/${name}`))
          .pipe(browserSync.stream());
      },
    },
  }));

const devHomepage = () =>
  src('src/index.pug')
    .pipe(pug({ locals: siteMeta }))
    .pipe(dest(outputDir))
    .pipe(browserSync.stream());

const devAssets = () =>
  src('src/assets/**/*', { allowEmpty: true })
    .pipe(dest(`${outputDir}/assets`))
    .pipe(browserSync.stream());

const watchFiles = () => {
  watch('src/index.pug', { ignoreInitial: false }, devHomepage);
  watch('src/assets/**', { ignoreInitial: false }, devAssets);

  watch(
    'src/includes/**/*.pug',
    parallel(fmChallenges.map(({ name, tasks }) => tasks[`${name}_markup`])),
  );
  watch(
    'src/includes/**/*.scss',
    parallel(fmChallenges.map(({ name, tasks }) => tasks[`${name}_styles`])),
  );
  watch(
    'src/includes/**/*.js',
    parallel(fmChallenges.map(({ name, tasks }) => tasks[`${name}_script`])),
  );

  fmChallenges.forEach(({ path, name, tasks }) => {
    watch(`${path}**/*.pug`, { ignoreInitial: false }, tasks[`${name}_markup`]);
    watch(
      `${path}**/*.scss`,
      { ignoreInitial: false },
      tasks[`${name}_styles`],
    );
    watch(`${path}**/*.js`, { ignoreInitial: false }, tasks[`${name}_script`]);
    watch(
      `${path}**/${assetsGlob}`,
      { ignoreInitial: false },
      tasks[`${name}_assets`],
    );
  });
};

// public tasks

exports.clean = clean;
exports.default = series(clean, parallel(watchFiles, serverStart));
