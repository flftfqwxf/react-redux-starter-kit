const url = require('url');
const log = require('gutil-color-log');
const path = require('path');
const types = require('./mimetype').types;
// const routes = require('../router').routes;
function route(req, routes) {
    let indexPath;
    let pathname = url.parse(req.url).pathname;
    // let route = routes[pathname];
    // if (route && typeof route === 'string') {
    //     pathname = route;
    // }
    // if (route && typeof route === 'function') {
    //     pathname = route;
    // }
    let ext = path.extname(pathname)
    if (ext) {
        ext = ext.slice(1)
    } else {
        ext = '';
        pathname += 'index.html';
    }
    const type = types[ext];
    switch (type) {
        case "text/html":
            indexPath = './views' + pathname;
            break;
        case 'application/json':
            indexPath = './data' + pathname;
            break;
        default:
            indexPath = './assets' + pathname;
            break;
    }
    log('green', 'url:' + indexPath);
    return indexPath
}
module.exports = route;