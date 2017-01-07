var gulp = require('gulp');
var watch = require('gulp-watch');

var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var imagemin = require('gulp-imagemin');

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
	},
	'images': {
		src: ['./publicsrc/images/**/*.jpg', './publicsrc/images/**/*.jpeg', './publicsrc/images/**/*.png', './publicsrc/images/**/*.svg'],
		dest: './public/images/'
	},
	'fonts': {
		src: ['./publicsrc/fonts/**/*.css',
			'./publicsrc/fonts/**/*.woff',
			'./publicsrc/fonts/**/*.woff2',
			'./publicsrc/fonts/**/*.eot',
			'./publicsrc/fonts/**/*.svg',
			'./publicsrc/fonts/**/*.ttf'
		],
		dest: './public/fonts/'
	},

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

gulp.task('build:images', function(){
	gulp.src(paths.images.src)
		.pipe(imagemin())
		.pipe(gulp.dest(paths.images.dest));
});

gulp.task('build:fonts', function(){
	gulp.src(paths.fonts.src)
		.pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('build', ['build:styles', 'build:scripts', 'build:images', 'build:fonts']);

gulp.task('watch:scripts', function () {
	gulp.watch(paths.scripts.src, ['build:scripts']);
});

gulp.task('watch:styles', function () {
	gulp.watch(paths.styles.src, ['build:styles']);
});

gulp.task('watch:images', function () {
	gulp.watch(paths.images.src, ['build:images']);
});

gulp.task('watch', ['watch:styles', 'watch:scripts', 'watch:images']);

gulp.task('serve', function(){
	nodemon({
		script: 'ssoc.js'
	});
});

gulp.task('dev', ['build', 'watch', 'serve']);
