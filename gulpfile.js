const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babel = require('babelify');
const path = require('path');
const Promise = require('bluebird');

Promise.config({
    longStackTraces: true,
    warnings: true
});

gulp.task('build', function () {
    const bundler = browserify(['./main/index.js'], {debug: true})
        .transform(babel,
            {
                presets: ["es2015", "stage-0"],
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

gulp.task('watch', function () {
    gulp.watch('./main/**', ['build']);
});

gulp.task('default', ['watch']);