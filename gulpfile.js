/* eslint-env node */
const glob = require('glob');
const eventStream = require('event-stream');
const browserSync = require('browser-sync').create();
const { series, parallel, src, dest, watch } = require('gulp');
const del = require('delete');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const combineMediaQuery = require('postcss-sort-media-queries');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const inline = require('gulp-inline-source');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const siteMeta = require('./src/siteMeta');

const output = {
  dev: 'dev',
  prod: 'prod',
};
const assetsGlob = '!(*.pug|*.scss|*.js)';

const devServerStart = done => {
  browserSync.init({
    server: {
      baseDir: output.dev,
    },
    port: 3000,
    logLevel: 'silent',
    open: false,
    notify: false,
  });
  done();
};

const prodServerStart = done => {
  browserSync.init({
    server: {
      baseDir: output.prod,
    },
    port: 3001,
    logLevel: 'silent',
    notify: false,
  });
  done();
};

const cleanDev = done => del([`${output.dev}/**`], done);
const cleanProd = done => del([`${output.prod}/**`], done);

const fmChallenges = glob
  .sync('src/fm-challenges/*/*/')
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
          .pipe(dest(`${output.dev}/${name}`))
          .pipe(browserSync.stream());
      },
      [`${name}_styles`]() {
        return src(`${path}/styles.scss`, { allowEmpty: true })
          .pipe(sourcemaps.init())
          .pipe(sass().on('error', sass.logError))
          .pipe(sourcemaps.write())
          .pipe(dest(`${output.dev}/${name}`))
          .pipe(browserSync.stream());
      },
      [`${name}_script`]() {
        return browserify({
          entries: `${path}/script.js`,
          debug: true,
        })
          .bundle()
          .pipe(source('script.js'))
          .pipe(dest(`${output.dev}/${name}`))
          .pipe(browserSync.stream());
      },
      [`${name}_assets`]() {
        return src(`${path}/${assetsGlob}`, { allowEmpty: true })
          .pipe(dest(`${output.dev}/${name}`))
          .pipe(browserSync.stream());
      },
    },
  }));

const devHomepage = () =>
  src('src/index.pug')
    .pipe(pug({ locals: siteMeta }))
    .pipe(dest(output.dev))
    .pipe(browserSync.stream());

const devAssets = () =>
  src('src/assets/**/*', { allowEmpty: true })
    .pipe(dest(`${output.dev}/assets`))
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

const changeFmChallengePath = path => {
  const { dirname: dir } = path;
  if (!dir.includes('fm-challenges')) return path;
  const dirname = dir.slice(dir.lastIndexOf('/') + 1);
  return { ...path, dirname };
};

const prodMarkup = () =>
  src(['src/index.pug', 'src/!(includes)/**/*.pug'])
    .pipe(pug({ locals: siteMeta }))
    .pipe(rename(changeFmChallengePath))
    .pipe(dest(output.prod));

const prodStyles = () =>
  src('src/!(includes)/**/*.scss', { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([combineMediaQuery(), autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('./'))
    .pipe(rename(changeFmChallengePath))
    .pipe(dest(output.prod));

const inlineStyles = () =>
  src(`${output.prod}/**/*.html`)
    .pipe(inline({ compress: false }))
    .pipe(dest(output.prod));

const removeStyleFiles = done => del([`${output.prod}/**/*.css`], done);

const prodScripts = done => {
  glob('src/!(includes)/**/*.js', (err, files) => {
    if (err) done(err);
    const tasks = files.map(entry =>
      browserify({
        entries: [entry],
        transform: [babelify.configure({ presets: ['@babel/preset-env'] })],
        sourceMaps: true,
      })
        .bundle()
        .pipe(source(entry))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(rename(changeFmChallengePath))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(output.prod)),
    );
    eventStream.merge(tasks).on('end', done);
  });
};

const prodFmAssets = () =>
  src(`src/fm-challenges/*/*/${assetsGlob}`, { allowEmpty: true })
    .pipe(
      rename(path => {
        const { dirname: dir } = path;
        const dirname = dir.slice(dir.lastIndexOf('/') + 1);
        return { ...path, dirname };
      }),
    )
    .pipe(dest(output.prod));

const prodAssets = () =>
  src(`src/assets/**/*`, { allowEmpty: true }).pipe(
    dest(`${output.prod}/assets`),
  );

exports.cleanDev = cleanDev;
exports.cleanProd = cleanProd;
exports.default = series(cleanDev, parallel(watchFiles, devServerStart));
exports.build = series(
  cleanProd,
  parallel(
    series(parallel(prodMarkup, prodStyles), inlineStyles, removeStyleFiles),
    prodScripts,
    prodFmAssets,
    prodAssets,
  ),
);
exports.serve = prodServerStart;
