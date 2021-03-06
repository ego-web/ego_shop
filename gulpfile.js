var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    compass = require('gulp-compass'),
    jade = require('gulp-www'),
    concat = require('gulp-concat'),
    spritesmith = require('gulp.spritesmith'),
    plumber = require('gulp-plumber');


gulp.task('server', function () {
    browserSync({
        port: 8000,
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('compass', function () {
    gulp.src('app/scss/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: 'app/config.rb',
            css: 'app/pre-css',
            sass: 'app/scss',
            sourcemap: true
        }))
        .pipe(gulp.dest('app/pre-css'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('app/img/socials/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        algorithm: 'left-right',
        padding: 70

    }));
    return spriteData.pipe(gulp.dest('app/sprites/'));
});

gulp.task('concat', function () {
    return gulp.src('app/pre-css/**/*.css')
        .pipe(concat('style.css', {
            newLine: '\n'
        }))
        .pipe(gulp.dest('app/css'));
});

gulp.task('jade', function () {
    gulp.src('app/www/**/*.www')
        .pipe(plumber())
        .pipe(jade({
            pretty: '\t'
        }))
        .pipe(gulp.dest('app'));
});



gulp.task('watch', function () {
    gulp.watch([
        'app/*.html',
        'app/js/*.js',
        'app/css/*.css'
        ]).on('change', browserSync.reload);
    gulp.watch('app/scss/**/*.scss', ['compass']);
    gulp.watch('app/pre-css/*.css', ['concat']);
    gulp.watch('app/www/**/*.www', ['jade']);
});

gulp.task('default', ['server', 'watch']);
