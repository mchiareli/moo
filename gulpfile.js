'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    inject = require('gulp-inject'),
    deploy = require('gulp-gh-pages'),
    browserSync = require('browser-sync').create();

    gulp.task('run',['build','watch'],function(){
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('dist/**').on('change', browserSync.reload);
});

gulp.task('watch',function() {
  gulp.watch(['src/site/**/*.html'],['build-site-html']);
  gulp.watch(['src/site/scss/**/*.scss'],['build-site-css']);
  gulp.watch(['src/moo/scss/**/*.scss'],['build-framework']);
});

gulp.task('default',['build']);

gulp.task('build',['build-framework','build-site']);

gulp.task('build-framework',function() {
  gulp.src('src/moo/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('build-site',['build-site-css','build-site-html']);

gulp.task('publish-site',['build'],function(){
  return gulp.src("./dist/**/*")
    .pipe(deploy());
});

gulp.task('build-site-html',function() {
   gulp.src('src/site/**/*.html')
      .pipe(gulp.dest('./dist'))
      .pipe(inject(gulp.src(['./dist/**/*.css'], {read: false}), {relative: true}))
      .pipe(gulp.dest('./dist'));
});

gulp.task('build-site-css',function() {
  gulp.src('src/site/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream());
});
