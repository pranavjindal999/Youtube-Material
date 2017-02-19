var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var minifyHtml = require('gulp-minify-html')
var ngTemplate = require('gulp-ng-template')
 
gulp.task('templates', function() {
  gulp.src('src/js/**/*.html')
    .pipe(minifyHtml({empty: true, quotes: true}))
    .pipe(ngTemplate({
      moduleName: 'youtube',
      filePath: 'js/templates.js',
      prefix: 'js/'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('useref', function(){
  return gulp.src('src/index.html')
    .pipe(useref())
	.pipe(gulpIf('*.js', uglify()))
	.pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))	
});

gulp.task('browserSyncDEBUG', function() {
    browserSync.init({
        server: {
            baseDir: 'src',
			middleware: [ historyApiFallback() ]
        },
        port:80,
        files: ['src/**/*.html', 'src/**/*.js','src/**/*.css']
    })
});

gulp.task('browserSyncMIN', function() {
    browserSync.init({
        server: {
            baseDir: 'dist',
			middleware: [ historyApiFallback() ]
        },
        port:80
    })
});

gulp.task('fontscopy', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('imgcopy', function() {
  return gulp.src('src/image/**/*')
  .pipe(gulp.dest('dist/image'))
});

gulp.task('favicon', function() {
  return gulp.src('src/favicon.ico')
  .pipe(gulp.dest('dist'))
});

gulp.task('redirects', function() {
  return gulp.src('src/_redirects')
  .pipe(gulp.dest('dist'))
});

gulp.task('distjscopy:local', function() {
  return gulp.src('src/js/distjs/local/**/*')
  .pipe(gulp.dest('dist/js'))
});

gulp.task('distjscopy:bitballoon', function() {
  return gulp.src('src/js/distjs/bitballoon/**/*')
  .pipe(gulp.dest('dist/js'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('default', ['browserSyncDEBUG']);

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'templates', ['useref', 'fontscopy', 'imgcopy','favicon', 'distjscopy:local', 'browserSyncMIN'], callback)
});

gulp.task('balloon', function (callback) {
  runSequence('clean:dist', 'templates', ['useref', 'fontscopy', 'imgcopy','favicon','redirects', 'distjscopy:bitballoon', 'browserSyncMIN'], callback)
});