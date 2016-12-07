var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var concatCss  = require('gulp-concat-css');
var plumber    = require('gulp-plumber');
var notifier   = require('node-notifier');

gulp.task('browserify', function(){
	return gulp.src('src/main.js')
		.pipe(plumber({
	        errorHandler: function (error) {
	        	var msg = JSON.stringify(error.message);
	            console.error('\033[31m', msg,'\x1b[0m');
	            notifier.notify({ title: 'Browserify buil error', message: msg });
	        }
    	}))
		.pipe(browserify({ transform: 'reactify', debug: true }))
		.pipe(gulp.dest('public'));
});

gulp.task('buildCss', function () {
	return gulp.src('assets/**/*.css')
		.pipe(concatCss("bundle.css"))
		.pipe(gulp.dest('public'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function(){
	gulp.watch('src/**/*.*', ['browserify']);
	gulp.watch('assets/**/*.css', ['buildCss']);
});