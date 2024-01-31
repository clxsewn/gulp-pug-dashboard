import gulp from 'gulp'
import { deleteAsync } from 'del'
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import size from 'gulp-size'
import dartBrowsersync from 'browser-sync'
import rename from 'gulp-rename'
import gulppug from 'gulp-pug'

const browsersync = dartBrowsersync.create()

const sass = gulpSass(dartSass);

const paths = {
    pug: {
      src: 'src/index.pug',
      dest: 'dist/'
    },
    styles: {
        src: "src/scss/**/*.scss",
        dest: 'dist/',
    },
    scripts: {
        src: "src/js/**/*.js",
        dest: 'dist/',
    },
    images: {
        src: "src/assets/**/*.{png,jpg,svg,webp,gif}",
        dest: 'dist/'
    }
}

function clean() {
    return deleteAsync(['dist/**/*'])
}

function pug() {
    return gulp.src(paths.pug.src)
        .pipe(rename('index.html'))
        .pipe(gulppug())
        .pipe(gulp.dest(paths.pug.dest))
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({ cascade: false }))
        .pipe(concat('styles.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest(paths.styles.dest))
}

function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(size({ showFiles: true }))
        .pipe(gulp.dest(paths.scripts.dest))
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
}

function watch() {
    browsersync.init({
        server: {
            baseDir: './dist/'
        }
    })
    gulp.watch(paths.pug.dest).on('change', browsersync.reload)
    gulp.watch('src/**/*.pug', pug)
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
    gulp.watch(paths.images.src, images)
}

const dev = gulp.series(clean, pug, images, gulp.parallel(styles, scripts), watch)
const build = gulp.series(clean, pug, images, gulp.parallel(styles, scripts))

export { clean, pug, styles, scripts, images, watch, build, dev }
export default dev