const gulp = require('gulp');

const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const {
  parallel, series, src, task, watch,
} = gulp;

const paths = {
  styles: {
    src: './publicsrc/styles/*.scss',
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
  res_images: {
    src: ['./publicsrc/res_images/**/*.jpg', './publicsrc/res_images/**/*.jpeg', './publicsrc/res_images/**/*.png'],
    dest: './public/res_images/',
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

task('build:styles', () => src(paths.styles.src)
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.styles.dest)));

task('build:scripts', () => src(paths.scripts.src)
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.scripts.dest)));

task('build:images', () => src(paths.images.src)
  .pipe(imagemin())
  .pipe(gulp.dest(paths.images.dest)));

task('build:responsive:1200', () => src(paths.res_images.src)
  .pipe(imageResize({ width: 1200, imageMagick: true }))
  .pipe(imagemin())
  .pipe(rename({ suffix: '_1200' }))
  .pipe(gulp.dest(paths.res_images.dest)));

task('build:responsive:800', () => src(paths.res_images.src)
  .pipe(imageResize({ width: 800, imageMagick: true }))
  .pipe(imagemin())
  .pipe(rename({ suffix: '_800' }))
  .pipe(gulp.dest(paths.res_images.dest)));

task('build:responsive:400', () => src(paths.res_images.src)
  .pipe(imageResize({ width: 400, imageMagick: true }))
  .pipe(imagemin())
  .pipe(rename({ suffix: '_400' }))
  .pipe(gulp.dest(paths.res_images.dest)));

task('build:responsive:all', series([
  'build:responsive:1200', 'build:responsive:800', 'build:responsive:400',
]));

task('build:fonts', () => src(paths.fonts.src)
  .pipe(gulp.dest(paths.fonts.dest)));

task('build', parallel(['build:styles', 'build:scripts', 'build:images', 'build:responsive:all', 'build:fonts']));

task('watch:scripts', () => watch(paths.scripts.src, parallel(['build:scripts'])));

task('watch:styles', () => watch(paths.styles.src, parallel(['build:styles'])));

task('watch:images', () => watch(paths.images.src,
  parallel(['build:images', 'build:responsive:all'])));

task('watch', parallel(['watch:styles', 'watch:scripts', 'watch:images']));

task('serve', (done) => nodemon({ script: 'ssoc.js', done }));

task('dev-serve', parallel(['watch', 'serve']));

task('dev', series(['build', 'dev-serve']));
