const {src, dest, watch, parallel, series} = require("gulp");
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();


/*Функция которая обновляет браузер при изменениях*/
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    })
}


/*функция отслеживает изменения в scss*/
function styles(){
    return src('app/scss/style.scss')
    .pipe(scss({outputStyle:"compressed"}))/*указываем на сжатие файла сss*/
    .pipe(concat('style.min.css'))/*переименовываес в мин файл*/
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
        grid: true
    }))/*устанавливаем префиксы*/
    .pipe(dest('app/css'))/*указываем путь для сохранения конечного файла*/
    .pipe(browserSync.stream())/*Применяет стили без перезагрузки всей страницы */
}

/*Функция следит за JS*/
function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/rateyo/src/jquery.rateyo.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
        'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
    
}
/*Функция следит за Изображениями*/
function image() {
    return src('app/images/**/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })

    ]))
    .pipe(dest('dist/images'))
    
}

/*постоянно следит за изменением файла */
function watching() {
    watch(['app/scss/**/*.scss'], styles);/*Следит за всеми файлами scss */
    watch(['app/js/**/*.js', '!app/js/main.min.js']);/*Следит за измением всех файлом JS  кроме main.min.js*/
    watch(['app/**/*.html']).on('change', browserSync.reload)/*Следит за файлом HTML и при изменение 'change' перезагружает страницу '.reload' */
    
}

/*Собирает проект*/ 
function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
        'app/js/main.min.js'
    ], {base: 'app'})/*Base указывает что при сборке проекта файлы надо перещать как в исходнике*/
    .pipe(dest('dist'))/*указываем путь для сохранения конечного файла*/
    
}
/*Удаляет папку Dist */
function cleanDist() {
    return del('dist')
    
}
exports.styles = styles;/*запуск функции по отслеживанию*/
exports.scripts = scripts;
exports.browserSync = browsersync;
exports.watching = watching;/*запуск функции по постоянному отслеживанию*/
exports.image = image;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, image, build);/*Функция выполняются в строго записанном порядке */
exports.default = parallel(styles,scripts,browsersync,watching);/*Одновременно запускает все функции которые прописаны */