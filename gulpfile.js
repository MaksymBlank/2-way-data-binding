var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');

gulp.task('pug', ()=>{
    return gulp.src('./source/views/index.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./test'));
})

gulp.task('sass', ()=>{
    return gulp.src('./source/styles/main.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('./test/css'));
})

gulp.task('js', ()=>{
    return gulp.src('./source/js/data-binding.js')
        .pipe(gulp.dest('./dist'));
})

/** No needed */
// gulp.task('watch', ()=>{
//     gulp.watch('./source/styles/**/*.scss', ['sass']);
//     gulp.watch('./source/views/**/*.pug', ['pug']);
// })

gulp.task('default', ['pug', 'sass', 'js']);