const { src, dest, series } = require(`gulp`);
const htmlValidator = require(`gulp-html`);
const htmlCompressor = require(`gulp-htmlmin`);
const cssValidator = require(`gulp-stylelint`);
const jsValidator = require(`gulp-eslint`);

let validateHTML = () => {
    return src([
        `html/*.html`,
        `html/**/*.html`])
        .pipe(htmlValidator());
};

let compressHTML = () => {
    return src([`html/*.html`,`html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
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

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.validateCSS = validateCSS;
exports.validateJS = validateJS;
