const http = require('http');
const url = require('url');
const log = require('gutil-color-log');
const fs = require('fs');
const path = require('path');
const types = require('./mimetype').types;
function start() {
    http.createServer(function(req, res) {
        const pathname = url.parse(req.url).pathname;
        let indexPath = path.resolve(__dirname, './views/index.html');
        if (pathname !== '/') {
            indexPath = '.' + pathname;
        }
        log('green', pathname);
        log('red', indexPath);
        const type = types[path.extname(pathname)];
        fs.exists(indexPath, function(exists) {
            if (!exists) {
                res.writeHead(404, {"Content-Type": type || 'text/html'});
                res.write('This is not found');
                res.end()
            } else {
                fs.readFile(indexPath, function(err, data) {
                    if (err) {
                        res.writeHead(500, {"Content-Type": type || 'text/html'});
                        res.end(err.toString())
                    } else {
                        res.writeHead(200, {"Content-Type": type || 'text/html'});
                        res.write(data)
                        res.end()
                    }
                })
            }
        })
    }).listen(6565);
    log('green', 'server has started')
    log('green', 'http://localhost:6565')
}
module.exports = start;