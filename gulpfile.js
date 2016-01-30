
'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    deploy = require('gulp-gh-pages');

gulp.task('run',['build','server']);

gulp.task('server',['watch'],function() {

  connect.server({
      root: 'dist',
      livereload: true,
      port:8000,
      debug:true
    }
  );
});

gulp.task('watch',function(){
  gulp.watch(['src/scss/**/*.scss'],['build-css']);
  gulp.watch(['vendor/**/*.html'],['build-vendor-html']);
  gulp.watch(['vendor/scss/*.scss'],['build-vendor-css']);
});

gulp.task('default',['build']);

gulp.task('build',['build-css','build-vendor']);

gulp.task('build-css',function(){
  gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('build-vendor',['build-vendor-css','build-vendor-html']);

gulp.task('publish-vendor',['build'],function(){
  return gulp.src("./dist/**/*")
    .pipe(deploy());
});

gulp.task('build-vendor-html',function() {
  gulp.src('vendor/**/*.html')
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
});

gulp.task('build-vendor-css',function() {
  gulp.src('vendor/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(connect.reload());
});
