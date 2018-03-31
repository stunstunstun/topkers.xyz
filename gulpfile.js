const gulp = require('gulp')

const paths = {
  rootFiles: ['.nvmrc', '.yarnrc', 'lerna.json', 'package.json', 'yarn.lock', '.env'],
  packages: ['packages/**/*', 'packages/**/.*', '!packages/**/__tests__{,/**/*}', '!packages/**/src{,/**/*}'],
  dist: 'dist',
}

gulp.task('copy:rootFiles', () => {
  gulp.src(paths.rootFiles).pipe(gulp.dest(paths.dist))
})

gulp.task('copy:packages', () => {
  gulp.src(paths.packages).pipe(gulp.dest(`${paths.dist}/packages`))
})

gulp.task('default', ['copy:rootFiles', 'copy:packages'])
