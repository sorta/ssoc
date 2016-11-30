var gulp = require('gulp');
var watch = require('gulp-watch');

var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');


var paths = {
	'styles': {
		src: './publicsrc/styles/**/*.scss',
		dest: './public/styles/'
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


gulp.task('build:styles', function(){
	gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.styles.dest));
});

gulp.task('build:scripts', function(){
	gulp.src(paths.scripts.src)
		.pipe(sourcemaps.init())
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('build', ['build:styles', 'build:scripts']);

gulp.task('watch:scripts', function () {
	gulp.watch(paths.scripts.src, ['scripts']);
});

gulp.task('watch:styles', function () {
	gulp.watch(paths.styles.src, ['styles']);
});

gulp.task('watch', ['watch:styles', 'watch:scripts']);

gulp.task('serve', function(){
	nodemon({
		script: 'ssoc.js'
	});
});

gulp.task('dev', ['build', 'watch', 'serve']);
