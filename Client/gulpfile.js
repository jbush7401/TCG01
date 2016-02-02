/**
 * Created by jbush_000 on 11/18/2015.
 */
"use strict";
var gulp = require('gulp');
var server = require('gulp-express');
var angularFilesort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');
var series = require('stream-series');
var sass = require('gulp-sass');
//var gulpIgnore = require('gulp-ignore');


var del = require('del');

var publicPath = "public";
var vendorPath = publicPath + "/app/assets/vendor";
var angularApp = publicPath + '/app/';

var serverComponents = "static/node_modules";
var appIndex = 'app/*.html';
var staticFolder = "static";

var paths = {
    jquery: {
        src: serverComponents + "/jquery/dist/jquery.min.js",
        dest: vendorPath + "/jquery"
    },
    bootstrap: {
        src: serverComponents + "/bootstrap/dist/**/*",
        dest: vendorPath + "/bootstrap"
    },
    angularUiRouter: {
        src: serverComponents + "/angular-ui-router/release/angular-ui-router.min.js",
        dest: vendorPath + "/angular-ui-router"
    },
    otherServerComponents: {
        src: [serverComponents + "/**/*.min.js", '!' + serverComponents + '/angular-ui-router/**', '!' + serverComponents + '/bootstrap/**', '!' + serverComponents + '/jquery/**'],
        dest: vendorPath
    },
    appSrc: {
        src: ['./app/**', '!./app/*.html'],
        dest: angularApp
    },
    images: {
        src: staticFolder + '/images/**/*',
        dest: angularApp + '/static/images'
    }
};

var formIndex = function () {
    var publicVendors = gulp.src([vendorPath + '/**/*', '!' + vendorPath + '/angular/*'], {
        read: false
    });

    var angularFile = gulp.src(vendorPath + '/angular/*', {
        read: false
    });

    var publicCSS = gulp.src([angularApp + '/css/*.css', vendorPath + '/**/*.css'], {
        read: false
    });


    return gulp.src(appIndex)
        .pipe(gulp.dest(angularApp))
        .pipe(inject(series(angularFile, publicVendors), {
            name: 'vendor',
            relative: true
        }))
        // gulp-angular-filesort depends on file contents, so don't use {read: false} here
        .pipe(inject(
            gulp.src([angularApp + '**/*.js', '!./' + angularApp + '/assets/**']).pipe(angularFilesort()), {
                relative: true
            }))
        .pipe(inject(publicCSS, {
            relative: true
        }))
        .pipe(gulp.dest(angularApp));
};


//default task, starts with watches
gulp.task('default', ['watch']);

gulp.task('watch', ['copyAll'], function (cb) {
    server.run(['public/server.js']);
    gulp.watch(staticFolder + '/node_modules/**/*', ['copyAll']);
    gulp.watch(appIndex, formIndex);
    gulp.watch(staticFolder + '/css/**/*', ['handleCSS'], function(event){server.notify(event)});
    gulp.watch(staticFolder + '/images/**/*', ['handleImages'], function(event){server.notify(event)});
    gulp.watch(paths.appSrc.src, function(event){
        gulp.run('handleApp');
        server.notify(event);
    });
});

gulp.task('copyAll', ['jquery', 'bootstrap', 'angular-ui-router', 'other_vendors', 'scripts', 'server.js', 'images', 'sass'], formIndex);

gulp.task('handleIndex', ['delIndex'], formIndex);

gulp.task('delIndex', function () {
    return del(['public/app/index.html']);
});

gulp.task('handleCSS', ['copyCSS'], formIndex);

gulp.task('copyCSS', function () {
    return gulp.src('./static/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.appSrc.dest));
});

gulp.task('handleImages', ['copyImages'], formIndex);

gulp.task('copyImages', function () {
    return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
});

gulp.task('handleApp', ['copyApp'], formIndex);

gulp.task('copyApp', function () {
    return gulp.src(paths.appSrc.src).pipe(gulp.dest(paths.appSrc.dest));
});

gulp.task('jquery', ['clean'], function () {
    return gulp.src(paths.jquery.src)
        .pipe(gulp.dest(paths.jquery.dest));
});

gulp.task('angular-ui-router',  ['clean'], function () {
    return gulp.src(paths.angularUiRouter.src)
        .pipe(gulp.dest(paths.angularUiRouter.dest));
});

gulp.task('bootstrap',  ['clean'], function () {
    return gulp.src(paths.bootstrap.src)
        .pipe(gulp.dest(paths.bootstrap.dest))
        .on('end', function () {
            del([
                vendorPath + '/bootstrap/css/*.*',
                '!' + vendorPath + '/bootstrap/css/bootstrap.min.css',
                '!' + vendorPath + '/bootstrap/css/bootstrap.css.map',
                vendorPath + '/bootstrap/js/bootstrap.js',
                vendorPath + '/bootstrap/js/npm.js'
            ]);
        });
});

gulp.task('other_vendors',  ['clean'], function () {
return gulp.src(paths.otherServerComponents.src)
    .pipe(gulp.dest(paths.otherServerComponents.dest))
});

gulp.task('scripts',['clean'], function () {
    return gulp.src(paths.appSrc.src).pipe(gulp.dest(paths.appSrc.dest));
});

gulp.task('server.js', ['clean'], function () {
    return gulp.src('server.js').pipe(gulp.dest(publicPath));
});

gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
});

gulp.task('sass', ['clean'], function () {
    return gulp.src('./static/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.appSrc.dest));
});

gulp.task('clean', function () {
    return del(['public']);
});
