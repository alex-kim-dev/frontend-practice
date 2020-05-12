/* eslint-env node */

'use strict';

const browserSync = require('browser-sync').create();
const { series, parallel, src, dest, watch } = require('gulp');
const del = require('delete');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const outputDir = 'dist';
const fmGlob = 'src/fm-challenges/*/**';
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

const devMarkup = () =>
  src(['src/index.pug', `${fmGlob}/index.pug`])
    .pipe(pug())
    .pipe(dest(outputDir))
    .pipe(browserSync.stream());

const devStyles = () =>
  src(`${fmGlob}/styles.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(outputDir))
    .pipe(browserSync.stream());

const devScripts = () =>
  src(`${fmGlob}/scripts.js`).pipe(dest(outputDir)).pipe(browserSync.stream());

const devFmAssets = () =>
  src(`${fmGlob}/${assetsGlob}`)
    .pipe(dest(outputDir))
    .pipe(browserSync.stream());

const devAssets = () =>
  src('src/assets/**/*')
    .pipe(dest(`${outputDir}/assets`))
    .pipe(browserSync.stream());

const watchFiles = () => {
  watch('src/**/*.pug', { ignoreInitial: false }, devMarkup);
  watch('src/**/*.scss', { ignoreInitial: false }, devStyles);
  watch('src/**/*.js', { ignoreInitial: false }, devScripts);
  watch(
    `src/fm-challenges/*/${assetsGlob}`,
    { ignoreInitial: false },
    devFmAssets,
  );
  watch('src/assets/**', { ignoreInitial: false }, devAssets);
};

// public tasks

exports.clean = clean;
exports.default = series(clean, parallel(watchFiles, serverStart));
