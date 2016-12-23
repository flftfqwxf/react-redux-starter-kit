const url = require('url');
const log = require('gutil-color-log');
const path = require('path');
const types = require('./mimetype').types;
const routerConfig = {
    '/': './views/index.html',
}
function route(req, res) {
    let indexPath;
    let pathname = url.parse(req.url).pathname;
    let ext = path.extname(pathname)
    if (ext) {
        ext = ext.slice(1)
    } else {
        ext = '';
        pathname += '/index.html';
    }
    const type = types[ext];
    switch (type) {
        case "text/html":
            indexPath = './views' + pathname;
            break;
        default:
            indexPath = './assets' + pathname;
            break;
    }
    log('green', 'url:' + indexPath);
    return indexPath
}
module.exports = route;