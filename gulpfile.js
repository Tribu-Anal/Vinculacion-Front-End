"use strict";
var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
	minifyCSS = require('gulp-minify-css'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	gulpif =require('gulp-if');

var env = 'development';
let paths = {};
paths.src = {};
paths.build = {};

paths.src.scripts = 'js/';
paths.src.less = 'css/';
paths.src.html = 'templates/';

paths.build.scripts = 'js/';
paths.build.less = 'css/';

gulp.task('js',function(){
	return gulp.src([
			paths.src.scripts+'**/*.js'
		])
		.pipe(concat('entailment-scripts.min.js'))
		.pipe(browserify({debug:env==='development'}))
		.pipe(gulpif(env==='production',uglify()))
		.pipe(gulp.dest(paths.build.scripts))
		.pipe(connect.reload());
});

gulp.task('less', function(){
	return gulp.src(paths.src.less+'entailment-styles.less')
		.pipe(concat('entailment-styles.min.css'))
		.pipe(less())
		.pipe(minifyCSS())
		.pipe(gulp.dest(paths.build.less))
		.pipe(connect.reload());	
});

gulp.task('html-templates', function () {
  gulp.src(paths.src.html + '**/*.html')
    .pipe(connect.reload());
});

gulp.task('html-index', function () {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('watch',function(){
	gulp.watch(paths.src.scripts+'**/*.js', ['js']);
	gulp.watch(paths.src.less+'**/*.less', ['less']);
	gulp.watch(paths.src.html+'**/*.html', ['html-templates']);
	gulp.watch(['index.html'], ['html-index']);

});

gulp.task('connect',['watch'], function(){
	connect.server({port:3000,livereload: true});
});

gulp.task('start',['connect', 'less','html-templates', 'html-index', 'js'],function(){
	console.log("Server now is running :D");	
});