var gulp = require('gulp');

var deploy = require("gulp-gh-pages");
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var usemin = require('gulp-usemin');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var declare = require('gulp-declare');

var paths = {
    scripts: 'scripts/**/*',
    font: 'font/**/*',
    stylesheets: 'stylesheets/**/*.less',
    templates: 'templates/**/*',
    images: 'images/**/*',
    html: '*.html',
    dist: 'dist',
    resources: ['CNAME', 'robots.txt', 'sitemap.xml', 'favicon.ico']

};

var distTasks = ['_image', '_usemin', '_resources', '_fonts'];
(function () {
    var cleanTask = function () {
        return gulp.src(paths.dist, {read: false})
            .pipe(clean());
    };
    var deployTask = function () {
        return gulp.src(paths.dist + '/**/*')
            .pipe(deploy());
    };
    var imageTask = function () {
        return gulp.src(paths.images).pipe(imagemin()).pipe(gulp.dest(paths.dist + '/images'));
    };
    var resourcesTask = function () {
        gulp.src(paths.resources).pipe(gulp.dest(paths.dist));
    };
    var fontsTask = function () {
        gulp.src(paths.font).pipe(gulp.dest(paths.dist + '/font'));
    };
    var useminTask = function () {
        return gulp.src(paths.html).pipe(usemin({
            css: ['concat', less(), minifyCss(), rev()],
            js: ['concat', uglify(), rev()],
            hbar: [handlebars(), defineModule('plain'), declare({namespace: 'TEMPLATES'}), 'concat', uglify(), rev()]
        })).pipe(gulp.dest(paths.dist));
    };
    var watchTask = function () {
        gulp.watch([paths.html, paths.templates, paths.stylesheets, paths.scripts], ['usemin']);
        gulp.watch([paths.images], ['image']);
        gulp.watch(paths.resources, ['resources']);
        gulp.watch([paths.font], ['fonts']);
    };

    gulp.task('clean', cleanTask);
    gulp.task('fonts', fontsTask);
    gulp.task('resources', resourcesTask);
    gulp.task('image', imageTask);
    gulp.task('usemin', useminTask);
    gulp.task('_fonts', ['clean'], fontsTask);
    gulp.task('_resources', ['clean'], resourcesTask);
    gulp.task('_image', ['clean'], imageTask);
    gulp.task('_usemin', ['clean'], useminTask);
    gulp.task('watch', distTasks, watchTask);

    gulp.task('deploy', distTasks, deployTask);
})();