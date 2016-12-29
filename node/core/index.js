const http = require('http');
const url = require('url');
const path = require('path');
const log = require('gutil-color-log');
const types = require('./mimetype').types;
const fs = require('fs');
const routes = require('./route');
class skyWeb {
    constructor() {
        this.getUrls = [];
        this.getUrlsCallback = {};
    }

    listen(port, callback, host = '127.0.0.1') {
        const _this = this;
        let server = http.createServer((req, res)=> {
            const pathname = url.parse(req.url).pathname;
            if (this.getUrls.indexOf(pathname) !== -1) {
                res.writeHead(200, {"Content-Type": 'text/html'});
                this.getUrlsCallback[pathname](req, res);
                res.end()
                return;
            }
            const realPath = routes(req)
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
        })
        server.listen(port, host, function() {
            log('green', 'server has started')
            log('green', 'http://' + host + ':' + port)
            callback();
        });
    }

    set(key, val) {
        this[key] = val;
    }

    get(url, callback) {
        let urls = {};
        urls[url] = callback;
        this.getUrls.push(url);
        this.getUrlsCallback[url] = callback;
    }

    // initRouter(){
    //
    // }
    // use(obj){
    //     this[]
    // }
}
module.exports = new skyWeb()