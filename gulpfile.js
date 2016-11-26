var gulp       = require('gulp');
var browserify = require('gulp-browserify');
var concat     = require('gulp-concat');
var pumber     = require('gulp-pumber');

gulp.task('browserify', function(){
	gulp.src('src/main.js')
		.pipe(pumber())
		.pipe(browserify({ transform: 'reactify', debug: true }))
		.pipe(gulp.dest('public'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function(){
	gulp.watch('src/**/*.*', ['default']);
});