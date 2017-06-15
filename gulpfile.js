const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babel = require('babelify');
const path = require('path');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const wait = require('gulp-wait');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sassify = require('sassify');

gulp.task('javascript', function () {
    const bundler = browserify({
        entries: ['./main/index.js'],
        paths: ['./node_modules','./']
    }, {debug: true})
        .transform(sassify, {
            'auto-inject': true,
            base64Encode: false,
            sourceMap: false
        })
        .transform(babel,
            {
                presets: ["es2015", "stage-0", "react"],
                plugins: ["transform-runtime"],
                "env": {
                    "production": {
                        "presets": [["babili",{
                            "mangle": false
                        }]]
                    }
                }
            });

    bundler.bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('build.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build'));
});

gulp.task('styles', function () {
    return gulp.src('./app/styles/**/*.scss')
        .pipe(wait(1500))
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['./node_modules/megadraft/lib/styles'], outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false}))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function () {
    gulp.watch('./main/**', ['build']);
});
gulp.task('build', ['styles', 'javascript']);

gulp.task('default', ['watch']);