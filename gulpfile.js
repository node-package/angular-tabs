"use strict";

var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var path = require('path');
var vm = require('vm');

function isOnlyChange (event) {
  return event.type === 'changed';
}

var options = {
  path: {
    src: {
      dir: 'src/*.js'
    },
    dist: {
      dir: 'dist/'
    }
  }
};

// Compress
gulp.task('compress-js', function () {
  gulp.src(options.path.src.dir)
    .pipe(uglify('angular.tab.js', {
      mangle: false,
      output: {
        comments: false,
        indent_level  : 2,
        beautify: true
      }
    }))
    .pipe(gulp.dest(options.path.dist.dir));
});

// Min
gulp.task('min-js', function () {
  gulp.src(options.path.src.dir)
    .pipe(uglify('angular.tab.min.js'))
    .pipe(gulp.dest(options.path.dist.dir));
});

// Build
gulp.task('build', ['compress-js', 'min-js'], function () {
  console.log("Build Ok");
});

// Watch
gulp.task('watch', ['build'], function () {
  gulp.watch([
    options.path.src.dir,
  ], function (event) {
    if (isOnlyChange(event)) {
      gulp.start('build');
    } else {
      gulp.start('inject');
    }
  });
});