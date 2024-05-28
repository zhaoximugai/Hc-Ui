const gulp = require('gulp')
const postcss = require('gulp-postcss');
const postcssConfig = require('./postcss.config.cjs');

gulp.task('css', async () => {
  
    return gulp.src(['src/components/**/*.css','src/styles/index.css'])
        .pipe(postcss(postcssConfig.plugins))
        .pipe(gulp.dest('dist/css'))

})