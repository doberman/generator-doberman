'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
  return gulp.src('app/stylesheets/**/*.scss')
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('html', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['styles', 'html']);

gulp.task('default', ['build'], function() {
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/**/*.html', ['html']);
});
