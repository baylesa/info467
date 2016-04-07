'use strict';

var gulp = require('gulp'),
    glob = require('glob'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

// CSS
var CSS = {
    'COMMON': {
        SOURCE: './css/common.scss',
        DESTINATION: './css',
        WATCH: './css/**/*.scss',
        FILE_NAME: 'common.min.css'
    },
    'PAGES': {
        SOURCE: './css/pages/*.scss',
        DESTINATION: './css/pages/',
        WATCH: './css/pages/*.scss'
    },
    PREFIX_CONFIG: {
        browsers: ['last 2 version', 'ios 8', 'android 4'],
        cascade: true
    }
};

gulp.task('css:common', function() {
    gulp.src(CSS.COMMON.SOURCE)
    .pipe(sass())
    .pipe(autoprefixer(CSS.PREFIX_CONFIG))
    .pipe(cssnano())
    .pipe(rename(CSS.COMMON.FILE_NAME))
    .pipe(gulp.dest(CSS.COMMON.DESTINATION));
});

gulp.task('css:pages', function() {
    gulp.src(CSS.PAGES.SOURCE)
    .pipe(sass())
    .pipe(autoprefixer(CSS.PREFIX_CONFIG))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(CSS.PAGES.DESTINATION));
});

var JS = {
    SOURCE: './js/!(*.min.js)',
    DESTINATION: './js/bundle',
    WATCH: './js/**/!(*.min.js|*.dev.js)'
};

gulp.task('js', function() {
    
    // return the baseName extension included from a path
    var getBaseName = function(path) {
        var directoryArr = path.split('/');
        return directoryArr[directoryArr.length - 1];
    };

    // bundle all files that aren't minified
    var jsFiles = glob.sync(JS.SOURCE, {nodir: true});
    for(var i = 0; i < jsFiles.length; i++) {
        var baseName = getBaseName(jsFiles[i]),
            extIndex = baseName.lastIndexOf('.'),
            fileName = baseName.substring(0, extIndex),
            extension = baseName.substring(extIndex, baseName.length),
            minBaseName = fileName + '.min' + extension,
            devBaseName = fileName + '.dev' + extension;
        
        // bundle for production and development
        var bundle = browserify(jsFiles[i])
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle();

        // write development bundle (non-minfied)
        bundle.pipe(source(devBaseName))
        .pipe(gulp.dest(JS.DESTINATION));

        // write production bundle (minified)
        bundle.pipe(source(minBaseName))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(JS.DESTINATION));
    }
});
 
gulp.task('watch', function() {
    gulp.watch(CSS.COMMON.WATCH, ['css:common']);
    gulp.watch(CSS.PAGES.WATCH, ['css:pages']);
    gulp.watch(JS.WATCH, ['js']);
});

gulp.task('default', ['watch', 'js', 'css:common', 'css:pages']);