
'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');

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
  gulp.watch(['vendor/**/*.html'],['build-vendor']);
});

gulp.task('default',['build']);

gulp.task('build',['build-css','build-vendor']);

gulp.task('build-css',function(){
  gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload());
});

gulp.task('build-vendor',function() {
  gulp.src('vendor/**/*.html')
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());

  gulp.src('vendor/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(connect.reload());
});
