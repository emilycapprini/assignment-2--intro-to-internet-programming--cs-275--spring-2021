const { src, dest, series, watch } = require(`gulp`);
const htmlValidator = require(`gulp-html`);
const htmlCompressor = require(`gulp-htmlmin`);
const cssValidator = require(`gulp-stylelint`);
const jsValidator = require(`gulp-eslint`);
const babel = require(`gulp-babel`);
const jsMinifier = require(`gulp-minify`);
const cssCompressor = require(`gulp-clean-css`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;

let validateHTML = () => {
    return src([
        `html/*.html`,
        `html/**/*.html`])
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src([`html/*.html`,`html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/html`));
};

let validateCSS = () => {
    return src([`css/*.css`,`css/**/*.css`])
        .pipe(cssValidator({reporters: [{formatter: `string`, console: true}]}));
};

let validateJS= () => {
    return src([`js/*.js`,`js/**/*.js`])
        .pipe(jsValidator())
        .pipe(jsValidator.format())
        .pipe(jsValidator.failAfterError());
};

let transpileJS = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`dev/js`));
};

let transpileJSForProd = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsMinifier())
        .pipe(dest(`prod/js`));
};

let compressCSS = () => {
    return src([`css/*.css`, `css/**/*.css`])
        .pipe(cssCompressor({compatibility: 'ie8'}))
        .pipe(dest(`prod/css`));
}

let dev = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        server: {
            baseDir: [
                `./`,
                `html`
            ]
        }
    });

    watch(`js/*.js`,
        series(validateJS)
    ).on(`change`, reload);

    watch(`css/**/*.css`,
        series(validateCSS)
    ).on(`change`, reload);

    watch(`html/**/*.html`,
        series(validateHTML)
    ).on(`change`, reload);

    // watch(`dev/img/**/*`).on(`change`, reload);
};

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.validateCSS = validateCSS;
exports.validateJS = validateJS;
exports.transpileJS = transpileJS;
exports.transpileJSForProd = transpileJSForProd;
exports.compressCSS = compressCSS;
exports.dev = series(validateCSS, validateJS, transpileJS, validateHTML, dev);
exports.build = series(
    compressHTML,
    transpileJSForProd,
    compressCSS
);
