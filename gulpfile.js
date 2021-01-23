let gulp = require('gulp');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let cssvariables = require('postcss-css-variables');
let cleanCSS = require('gulp-clean-css');
let autoprefixer = require('autoprefixer');
let gutil = require('gulp-util');
let addsrc = require('gulp-add-src');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify-es').default;
let changed = require('gulp-changed');
let header = require('gulp-header');
let coffee = require("gulp-coffee");
let plumber = require('gulp-plumber');
let wait = require('gulp-wait');
let zip = require('gulp-zip');
var jslint = require('gulp-jslint');

let browserSync = require('browser-sync').create();
let pkg = require('./package.json');
let _s = require('underscore.string');

let PORT = {
  "GHOST": 2368,
  "BROWSERSYNC": 3000
};

let bundleName = _s.slugify(pkg.name);

let dist = {
  "css": {
    "dir": 'assets/css',
    "name": bundleName + '.css'
  },
  "js": {
    "dir": 'assets/js',
    "name": bundleName + '.js',
    "postName": bundleName + ".post.js",
    "vendorName": bundleName + ".vendor.js",
    "temp": {
      "dir": 'assets/src/js',
      "commonName": bundleName + ".temp.common.js",
      "postName": bundleName + ".temp.post.js",
    }
  },
  "zip": {
    "name": bundleName + ".zip",
    "dir": 'dist/'
  },
  "build": {
    "dir": 'build/',
    "src": 'build/**/*',
  }
};


let src = {
  "sass": {
    "main": 'assets/src/scss/' + bundleName + '.scss',
    "files": ['assets/src/scss/**/**'],
    "vendor": [
      'assets/src/scss/font-awesome/**/**',
      'node_modules/bourbon/core/**/**',
    ]
  },
  "js": {
    "common": {
      "main": ['assets/src/coffee/__init.coffee',
        'assets/src/coffee/main.coffee',
        'assets/src/coffee/cover.coffee'
      ],
      "vendor": [
        // 'assets/src/vendor/Zepto-1.2.0.js', // head
        'assets/src/vendor/jQuery-3.5.1.js', // head
        'assets/src/vendor/pace.min.js', // head
        'assets/src/vendor/fastclick.js', //
        'assets/src/vendor/jquery.ghosthunter.js',
      ]
    },
    "post": [
      'assets/src/vendor/readingTime.min.js',
      'assets/src/vendor/jquery.toc.min.js',
      'assets/src/vendor/jquery.fitvids.js',
      'assets/src/vendor/prism.js'
    ]
  },
  "css": {
    "vendor": [
      'assets/src/vendor/prism.css',
    ]
  }
};
let banner = ["/**",
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
    .pipe(concat(dist.js.temp.commonName))
    .pipe(jslint().on('error', gutil.log))
    .pipe(gulp.dest(dist.js.temp.dir));
});

gulp.task('js-vendor', function () {
  return gulp.src(src.js.common.vendor)
    .pipe(plumber())
    .pipe(changed(dist.js.dir))
    .pipe(concat(dist.js.vendorName))
    .pipe(jslint().on('error', gutil.log))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest(dist.js.dir));
})

gulp.task('js-post', function () {
  return gulp.src(src.js.post)
    .pipe(plumber())
    .pipe(changed(dist.js.temp.dir))
    .pipe(concat(dist.js.temp.postName))
    .pipe(jslint().on('error', gutil.log))
    .pipe(gulp.dest(dist.js.temp.dir));
});

gulp.task('css', function () {
  return gulp.src(src.sass.vendor, {allowEmptyArray: true})
    .pipe(changed(dist.css.dir))
    .pipe(addsrc(src.sass.main))
    .pipe(plumber())
    .pipe(wait(100))
    .pipe(sass({outputStyle: 'expanded'}).on('error', gutil.log))
    .pipe(addsrc(src.css.vendor))
    .pipe(concat(dist.css.name))
    .pipe(postcss([autoprefixer(), cssvariables({preserve: true})]))
    .pipe(cleanCSS({
      level: {1: {specialComments: 0}},
      compatibility: 'ie9'
    }))
    .pipe(header(banner))
    .pipe(gulp.dest(dist.css.dir))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', gulp.series('js-vendor', 'js-common', 'js-post', function () {
  return gulp.src([
    dist.js.temp.dir + "/" + dist.js.temp.commonName,
  ])
    .pipe(changed(dist.js.dir))
    .pipe(concat(dist.js.name))
    .pipe(uglify().on('error', gutil.log))
    .pipe(header(banner))
    .pipe(gulp.dest(dist.js.dir));
}, function () {
  return gulp.src([
    dist.js.temp.dir + "/" + dist.js.temp.commonName,
    dist.js.temp.dir + "/" + dist.js.temp.postName,
  ])
    .pipe(changed(dist.js.dir))
    .pipe(concat(dist.js.postName))
    .pipe(uglify().on('error', gutil.log))
    .pipe(header(banner))
    .pipe(gulp.dest(dist.js.dir));
}))
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
    "!assets", "!assets/src/**/*/",
    "!node_modules", "!node_modules/**/*",
    "!build", "!build/**/*",
    "!dist", "!dist/**/*"
  ])
    .pipe(gulp.dest(dist.build.dir));
}));

gulp.task('zip', gulp.series('build', function () {
  return gulp.src([dist.build.src])
    .pipe(zip(dist.zip.name))
    .pipe(gulp.dest(dist.zip.dir));
}));

gulp.task('default', gulp.parallel('watch'));
