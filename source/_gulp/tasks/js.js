'use strict';

var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch  = require('gulp-watch');

gulp.task('js', function() {
    return gulp.src([
        // JQUERY PLUGINS 
        '../_src/scripts/plugins/bootstrap.min.js',
        '../_src/scripts/plugins/modernizr.js',
        '../_src/scripts/plugins/velocity.min.js',
        '../_src/scripts/plugins/owl-carousel.min.js',
        '../_src/scripts/plugins/jquery.lazy.min.js',

        // NAVIGATION SCRIPTS
        '../_src/scripts/TV/TVKeyValue.js',
        '../_src/scripts/TV/TVOperation.js',

        // THEME SCRIPTS
        '../_src/scripts/models.js',

        '../_src/scripts/pages/splashscreen.js',
        '../_src/scripts/pages/pg-produtos.js',
        '../_src/scripts/pages/pg-produto.js',
        '../_src/scripts/pages/pg-home.js',
        '../_src/scripts/pages/pg-search.js',
        '../_src/scripts/pages/pg-video.js',
        
        '../_src/scripts/navigation.js',


    ])
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('../../project/js'))


});

gulp.task('js-w', function(){
    gulp.watch('../_src/scripts/**/*.js', gulp.series('js'));
});
