var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    babel = require('gulp-babel');
//babel-preset-es2015

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();

gulp.task('build-css', function() {
    gulp.src('./scss/*')
        .pipe(sourcemaps.init())			//Remember original state
        .pipe(print())
        .pipe(sass())						//Pass to SASS
        .pipe(cachebust.resources())		//Clear the cache
        .pipe(concat('styles.css'))			//Concat all output of those files into styles.css
        .pipe(sourcemaps.write('./'))	//Write out original files. THIS IS FOR DEBUGGING
        .pipe(gulp.dest('./dist/css'));			//Write everything out into a folder called dist
})

gulp.task('clean', function(cb) {
    del([
        'dist'
    ], cb);
})

gulp.task('build-js', function() {
    return gulp.src(['js/**/*.js','js/*.js', './directives/*.js'])
        .pipe(sourcemaps.init())					//Keep source files separate in debugger
        .pipe(print())                        	//Copy into dist
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(concat('bundle.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});


gulp.task('build', ['build-css','build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
})

gulp.task('watch', function() {
    return gulp.watch([
        './index.html',
        './views/*.html',
        './scss/*.*css',
        './js/**/*.js',
        './js/*.js',
        './directives/*.js',
        './directives/*.html'
    ], ['build']);
});