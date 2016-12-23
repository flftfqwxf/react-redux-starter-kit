const http = require('http');
const url = require('url');
const path = require('path');
const log = require('gutil-color-log');
const types = require('./mimetype').types;
const fs = require('fs');
const routes = require('./route');
function start() {
    http.createServer(function(req, res) {
        const pathname = url.parse(req.url).pathname;
        const realPath = routes(req, res)
        let ext = path.extname(pathname)
        ext = ext ? ext.slice(1) : 'unknown';
        const type = types[ext];
        fs.exists(realPath, function(exists) {
            if (!exists) {
                res.writeHead(404, {"Content-Type": type || 'text/html'});
                res.write('This is not found');
                res.end()
            } else {
                fs.readFile(realPath, function(err, data) {
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