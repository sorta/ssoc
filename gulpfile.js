const gulp = require('gulp');

const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


const paths = {
  styles: {
    src: './publicsrc/styles/**/*.scss',
    dest: './public/styles/',
  },
  scripts: {
    src: ['./publicsrc/scripts/**/*.js'],
    dest: './public/scripts/',
  },
  images: {
    src: ['./publicsrc/images/**/*.jpg', './publicsrc/images/**/*.jpeg', './publicsrc/images/**/*.png', './publicsrc/images/**/*.svg'],
    dest: './public/images/',
  },
  fonts: {
    src: ['./publicsrc/fonts/**/*.css',
      './publicsrc/fonts/**/*.woff',
      './publicsrc/fonts/**/*.woff2',
      './publicsrc/fonts/**/*.eot',
      './publicsrc/fonts/**/*.svg',
      './publicsrc/fonts/**/*.ttf',
    ],
    dest: './public/fonts/',
  },

};

const processors = [
  autoprefixer,
  cssnano,
];

gulp.task('build:styles', () => {
  gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('build:scripts', () => {
  gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('build:images', () => {
  gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('build:fonts', () => {
  gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('build', ['build:styles', 'build:scripts', 'build:images', 'build:fonts']);

gulp.task('watch:scripts', () => {
  gulp.watch(paths.scripts.src, ['build:scripts']);
});

gulp.task('watch:styles', () => {
  gulp.watch(paths.styles.src, ['build:styles']);
});

gulp.task('watch:images', () => {
  gulp.watch(paths.images.src, ['build:images']);
});

gulp.task('watch', ['watch:styles', 'watch:scripts', 'watch:images']);

gulp.task('serve', () => {
  nodemon({ script: 'ssoc.js' });
});

gulp.task('dev', ['build', 'watch', 'serve']);
