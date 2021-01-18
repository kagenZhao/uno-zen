var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssvariables = require('postcss-css-variables');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('autoprefixer');
var rename = require('gulp-rename');
var wait = require('gulp-wait');
var merge = require('merge2');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifyES = require('gulp-uglifyes');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
// 错误处理
var plumber = require("gulp-plumber");
var stylish = require("jshint-stylish");
var coffee = require("gulp-coffee");

var del = require('del');
var zip = require('gulp-zip');
var beautify = require('gulp-jsbeautifier');
var browserSync = require('browser-sync').create();


gulp.task('js-common', function () {
    return gulp.src(['./assets/js/src/__init.coffee',
                        './assets/js/src/main.coffee',
                        './assets/js/src/cover.coffee'])
    .pipe(coffee())
    .pipe(concat("uno-zen.common.js"))
    .pipe(uglifyES().on('error', errorHandler))
    .pipe(gulp.dest('./assets/js'))


    
    function errorHandler (error) {
     console.log(error.toString());
     this.emit('end');
   }
});

gulp.task('css', function() {
    return gulp.src(["./assets/scss/uno-zen.scss"])
    .pipe(sass())
    .pipe(concat('uno-zen.css'))
    .pipe(postcss([autoprefixer(), cssvariables({preserve: true})]))
    .pipe(cleanCSS({
        level: {1: {specialComments: 0}},
        compatibility: 'ie9'}))
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('js-post', function() {
    return gulp.src(['./assets/js/src/prism.js'])
    .pipe(concat('uno-zen.post.js'))
    .pipe(uglify({
        compress: {
            drop_console: true
        }
    })) 
    .pipe(gulp.dest('./assets/js'))
});

gulp.task('watch', gulp.series('css', 'js-common', function () {
    browserSync.init({
        proxy: "http://localhost:2368"
    });
    gulp.watch(['./assets/scss/**/**'], { allowEmpty: true }).on('change', gulp.series('css'));
    gulp.watch(['./assets/js/src/__init.coffee',
                './assets/js/src/main.coffee',
                './assets/js/src/cover.coffee'], { allowEmpty: true }).on('change', gulp.series('js-common', browserSync.reload));
    gulp.watch(['./assets/js/src/prism.js']).on('change', gulp.series('js-post', browserSync.reload));
    gulp.watch('./**/*.hbs').on('change', browserSync.reload);
}));

gulp.task('default', gulp.parallel('watch'));
