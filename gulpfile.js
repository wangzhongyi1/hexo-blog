const { src, series, dest } = require("gulp");
const clean = require('gulp-clean');
const htmlmin = require("gulp-htmlmin");
const cssmin = require('gulp-cssmin');
const terser = require('gulp-terser');

function cleanDir() {
  return src('dist', {read: false, allowEmpty: true})
    .pipe(clean());
}

function minHtml() {
  const options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true, //压缩页面CSS
  };
  return src("public/**/*.html")
    .pipe(htmlmin(options))
    .pipe(dest("dist"));
}

function minCss() {
  return src('public/**/*.css')
    .pipe(cssmin())
    .pipe(dest('dist'))
}

function minJs() {
  return src('public/**/*.js')
    .pipe(terser({ warnings: true }))
    .pipe(dest('dist'))
}

function removeImg() {
  return src('public/img/**/*')
    .pipe(dest('dist/img'))
}

exports.default = series(cleanDir, removeImg, minCss, minJs, minHtml);
