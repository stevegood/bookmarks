var gulp = require('gulp'),
    bower = require('gulp-bower'),
    bower_path = 'bower_components',
    bootstrap = bower_path + '/bootstrap-sass-official/assets',
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify');

gulp.task('bower', function(){
    return bower();
});

gulp.task('css', function(){
    return gulp.src('assets/scss/*.scss')
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('fonts', function(){
    return gulp.src(bootstrap + '/fonts/bootstrap/*.*')
        .pipe(gulp.dest('public/fonts/bootstrap'));
});

gulp.task('js', function(){
    var js_src = [
        bower_path + '/jquery/dist/jquery.js',
        bootstrap + 'javascripts/bootstrap.js',
        'assets/javascripts/main.js'
    ];

    return gulp.src(js_src)
        .pipe(uglify({mangle:true}))
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('public/javascripts'));
});

gulp.task('images', function(){
    return gulp.src('assets/images/**/*')
        .pipe(gulp.dest('public/images'));
});

gulp.task('compile-assets', ['css', 'fonts', 'js', 'images']);
gulp.task('init', ['bower', 'compile-assets']);

