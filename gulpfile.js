var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    minifyCss = require('gulp-minify-css'),
    todo = require('gulp-todo');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('source/js/*.js', ['build-js']);
    gulp.watch('source/css/*.css', ['minify-css']);
    gulp.watch('source/sass/*.sass', ['build-css']);
});

/**
 * Lint
 */

// JS Lint
gulp.task('jshint', function() {
    return gulp.src('source/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshint-server', function() {
    return gulp.src(['*.js','routes/*.js','models/*.js','config/*.js','bin/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// CSS Lint
gulp.task('csslint', function() {
    gulp.src('source/css/*.css')
        .pipe(csslint())
        .pipe(csslint.reporter());
});

/**
 * Build and/or minify
 */

gulp.task('build-js',['jshint'], function() {
    return [gulp.src(['source/js/tools.js','source/js/editor.js'])
          .pipe(sourcemaps.init())
          .pipe(concat('bundle.js'))
          //do not uglify if gulp is ran with '--type dev'
          .pipe(gutil.env.type === 'dev' ? gutil.noop() : uglify())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('public/js')),
        gulp.src(['source/js/tools.js','source/js/shared.js'])
          .pipe(sourcemaps.init())
          .pipe(concat('bundle-share.js'))
          //do not uglify if gulp is ran with '--type dev'
          .pipe(gutil.env.type === 'dev' ? gutil.noop() : uglify())
          .pipe(sourcemaps.write())
          .pipe(gulp.dest('public/js'))];
});

gulp.task('build-css', function() {
    return gulp.src('source/sass/*.css')
        .pipe(sourcemaps.init()) // Process the original sources
        .pipe(sass())
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(gulp.dest('public/css'));
});

gulp.task('minify-css', function() {
    return gulp.src('source/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('public/css'));
});

/**
 * Tools
 */
// generate a todo.md from your javascript files
gulp.task('todo', function() {
    gulp.src('source/js/*.js')
        .pipe(todo())
        .pipe(gulp.dest('./'));
    // -> Will output a TODO.md with your todos
});
