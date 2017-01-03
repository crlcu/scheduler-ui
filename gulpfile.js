var gulp = require('gulp');

// include plug-ins
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var rename = require('gulp-rename');

// Compile less
gulp.task('compile-less', function() {
    gulp.src(['public/css/less/style.less'])
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('styles', ['compile-less']); 
gulp.task('default', ['styles']);
