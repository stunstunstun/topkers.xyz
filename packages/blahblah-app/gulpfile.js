var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')

gulp.task(
  'sass',
  gulp.series(function() {
    return gulp
      .src('./src/scss/*.scss')
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./src'))
  }),
)

gulp.task(
  'default',
  gulp.series('sass', function() {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
  }),
)
