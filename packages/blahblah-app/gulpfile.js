const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')

gulp.task(
  'sass',
  gulp.series(() =>
    gulp
      .src('./src/scss/*.scss')
      .pipe(
        sass({
          outputStyle: 'compressed',
        }),
      )
      .pipe(autoprefixer())
      .pipe(gulp.dest('./src'))),
)

gulp.task(
  'default',
  gulp.series('sass', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
  }),
)
