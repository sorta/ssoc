var gulp = require('gulp');
var watch = require('gulp-watch');
var shell = require('gulp-shell')

var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');


var paths = {
	'styles': {
		src: './publicsrc/styles/**/*.scss',
		output: './public/styles/'
	},
	'scripts': {
		src: ['./publicsrc/scripts/**/*.js'],
		dest: './public/scripts/'
	}

};

var processors = [
	autoprefixer,
	cssnano
];

gulp.task('watch:sass', function () {
	gulp.watch(paths.styles.src, ['sass']);
});

gulp.task('sass', function(){
	gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.output));
});

gulp.task('scripts', function(){
	gulp.src(paths.scripts.src)
		.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('watch:scripts', function () {
	gulp.watch(paths.scripts.src, ['scripts']);
});

gulp.task('watch', ['watch:sass']););
