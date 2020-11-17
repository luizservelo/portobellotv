'use strict';

var gulp   = require('gulp');
var csso   = require('gulp-csso');
var sass   = require('gulp-sass');
var rename = require('gulp-rename');
var watch  = require('gulp-watch');

// THEME [css] - Compilar arquivos sass
gulp.task('css', function () {
    return gulp.src('../_src/sass/style.sass', { base: "." })
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe(csso())
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace('_src/sass', '../project/css');
            path.basename = 'style';
        }))
        .pipe(gulp.dest('.'))
});

// WATCH - ADMIN [adm] sass files
gulp.task('css-w', function(){
    gulp.watch('../_src/sass/**/*.sass', gulp.series('css'));
});
