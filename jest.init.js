// https://stackoverflow.com/questions/46227783/encoding-not-recognized-in-jest-js
const iconv = require('iconv-lite');
const encodings = require('iconv-lite/encodings');

iconv.encodings = encodings;
