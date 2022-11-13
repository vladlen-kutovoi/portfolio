const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const browsersync = require('browser-sync').create();
const del = require('del');

function clean() {
  return del(['./dist/**', '!./dist/README.md']);
}

function html() {
  return src('./src/*.html')
    .pipe(dest('./dist'))
    .pipe(browsersync.stream());
}

function styles() {
  return src('./src/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('./dist/css'))
    .pipe(browsersync.stream());
}

function scripts() {
  return src('./src/js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('./dist/js'))
    .pipe(browsersync.stream());
}

function images() {
  return src('./src/img/**/*')
    .pipe(dest('./dist/img'))
    .pipe(browsersync.stream());
}

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000
  });
}

function watchFiles() {
  watch('./src/sass/**/*', styles);
  watch('./src/*.html', html);
  watch('./src/img/**/*', images);
  watch('./src/js/**/*', scripts);
}
exports.default = series(clean, parallel(html, styles, scripts, images), parallel(watchFiles, browserSync));