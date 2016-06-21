'use strict';

const fs = require('fs');

const portIndex = 2;

let port = '';

process.argv.forEach((val, index, array) => {
    if (index === portIndex)
        port = val;
});

let indexHtml = fs.readFileSync('./public/index.html', 'utf-8');

const searchString = 'var PORT';
const jumpLength = searchString.length;
const endIndex = indexHtml.indexOf(searchString)+jumpLength;

let newIndexHtml = `${indexHtml.slice(0, endIndex)} = "${port}"${indexHtml.slice(endIndex+9)}`;