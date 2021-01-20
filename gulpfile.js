var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssvariables = require('postcss-css-variables');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('autoprefixer');
var gutil = require('gulp-util');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var terser = require('gulp-terser');
var changed = require('gulp-changed');
var header = require('gulp-header');
var coffee = require("gulp-coffee");
var plumber = require('gulp-plumber');
var wait = require('gulp-wait');
var zip = require('gulp-zip');

var browserSync = require('browser-sync').create();
var pkg = require('./package.json');
var _s = require('underscore.string');

var PORT = {
  "GHOST": 2368,
  "BROWSERSYNC": 3000
};

var buildDir = './build/';
var exportDir = './dist/';

var dist = {
  "name": _s.slugify(pkg.name),
  "css": 'assets/css',
  "js": 'assets/js'
};

var src = {
  "sass": {
    "main": 'assets/scss/' + dist.name + '.scss',
    "files": ['assets/scss/**/*.scss']
  },
  "js": {
    "common": {
      "main": ['assets/js/src/__init.coffee',
        'assets/js/src/main.coffee',
        'assets/js/src/cover.coffee'
      ],
      "vendor": [
        'assets/vendor/jquery-3.5.1.min.js',
        'assets/vendor/jquery.toc.min.js',
        'assets/vendor/fastclick.js',
        'assets/vendor/pace.min.js',
        'assets/vendor/readingTime.min.js',
        'assets/vendor/jquery.ghosthunter.js'
      ]
    },
    "post": [
      'assets/vendor/jquery.fitvids.js',
      'assets/js/src/prism.js'
    ]
  },
  "css": {
    "main": 'assets/css/' + dist.name + '.css',
    "vendor": ['assets/scss/bourbon/**/**']
  }
};
var banner = ["/**",
  ` * ${pkg.name} - ${pkg.description}`,
  ` * @version ${pkg.version}`,
  ` * @link    ${pkg.homepage}`,
  ` * @author  ${pkg.author.name} (${pkg.author.url})`,
  ` * @license ${pkg.license}`,
  " */",
  ""].join("\n");


gulp.task('js-common', function () {
  return gulp.src(src.js.common.main)
    .pipe(plumber())
    .pipe(coffee())
    .pipe(concat(dist.name + '.common.js'))
    .pipe(terser().on('error', gutil.log))
    .pipe(header(banner))
    .pipe(gulp.dest(dist.js));
});

gulp.task('js-vendor', function () {
  return gulp.src(src.js.common.vendor)
    .pipe(plumber())
    .pipe(changed(dist.js))
    .pipe(concat(dist.name + '.vendor.js'))
    .pipe(terser().on('error', gutil.log))
    .pipe(header(banner))
    .pipe(gulp.dest(dist.js));
})


gulp.task('js-post', function () {
  return gulp.src(src.js.post)
    .pipe(plumber())
    .pipe(changed(dist.js))
    .pipe(concat(dist.name + '.post.js'))
    .pipe(uglify({
      compress: {
        drop_console: true
      }
    }))
    .pipe(header(banner))
    .pipe(gulp.dest(dist.js));
});

gulp.task('css', function () {
  return gulp.src(src.css.vendor, {allowEmptyArray: true})
    .pipe(changed(dist.css))
    .pipe(addsrc(src.sass.main))
    .pipe(plumber())
    .pipe(wait(100))
    .pipe(sass({outputStyle: 'expanded'}).on('error', gutil.log))
    .pipe(concat('' + dist.name + '.css'))
    .pipe(postcss([autoprefixer(), cssvariables({preserve: true})]))
    .pipe(cleanCSS({
      level: {1: {specialComments: 0}},
      compatibility: 'ie9'
    }))
    .pipe(header(banner))
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', gulp.series('js-vendor', 'js-common', 'js-post'))
gulp.task('preBuild', gulp.series('css', 'js'))

gulp.task('watch', gulp.series('preBuild', function () {
  browserSync.init({
    proxy: "http://localhost:" + PORT.GHOST,
    port: PORT.BROWSERSYNC,
    files: ['assets/**/*.*']
  });
  gulp.watch(src.sass.files).on('change', gulp.series('css'));
  gulp.watch(src.js.common.main, {allowEmpty: true}).on('change', gulp.series('js-common', browserSync.reload));
  gulp.watch(src.js.post).on('change', gulp.series('js-post', browserSync.reload))
  gulp.watch('./**/*.hbs').on('change', browserSync.reload);
}));

gulp.task('build', gulp.series('preBuild', function () {
  return gulp.src([
    "**",
    "!assets/scss", "!assets/scss/**/*",
    "!assets/vendor/**/*",
    "!assets/js/src/*",
    "!node_modules", "!node_modules/**",
    "!build", "!build/**",
    "!dist", "!dist/**"
  ])
    .pipe(gulp.dest(buildDir));
}));

gulp.task('zip', gulp.series('build', function () {
  var fileName = pkg.name + '.zip';
  return gulp.src(['build/**/*'])
    .pipe(zip(fileName))
    .pipe(gulp.dest(exportDir));
}));

gulp.task('default', gulp.parallel('watch'));
