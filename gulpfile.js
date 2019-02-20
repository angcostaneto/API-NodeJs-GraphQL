const gulp = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

// Cria o projeto baseado nas configurações do tsconfig.json.
const tsProject = ts.createProject('tsconfig.json');

// Segundo parametro é a função que deve ser esperada para rodar a proxima tarefa.
gulp.task('scripts', ['static'], () => {

    const tsResult = tsProject.src()
        // Define uma operação.
        .pipe(tsProject());

    return tsResult.js
        .pipe(gulp.dest('dist'));

});

gulp.task('static', ['clean'], () => {
    return gulp
        .src(['src/**/*.json'])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return gulp
        .src('dist')
        .pipe(clean());
});

gulp.task('build', ['clean', 'static', 'scripts']);

gulp.task('watch', ['build'], () => {
    return gulp.watch(['src/**/*.ts', 'src/**/*.json'], ['build']);
});

gulp.task('default', ['watch']);