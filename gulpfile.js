var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var concatCss  = require('gulp-concat-css');
var plumber    = require('gulp-plumber');

gulp.task('browserify', function(){
	return gulp.src('src/main.js')
		.pipe(plumber())
		.pipe(browserify({ transform: 'reactify', debug: true }))
		.pipe(gulp.dest('public'));
});

gulp.task('buildCss', function () {
	return gulp.src('assets/**/*.css')
		.pipe(concatCss("bundle.css"))
		.pipe(gulp.dest('public'));
});

gulp.task('default', ['browserify', 'buildCss']);

gulp.task('watch', function(){
	gulp.watch('src/**/*.*', ['default']);
});