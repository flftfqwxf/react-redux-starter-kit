const http = require('http');
const url = require('url');
const path = require('path');
const log = require('gutil-color-log');
const types = require('./mimetype').types;
const fs = require('fs');
const routes = require('./route');
const methods = require('methods');
class skyWeb {
    constructor() {
        this.methods = {};
        this.routes = {};
        methods.forEach((item)=> {
            this.routes[item] = {}
            this[item] = (url, callback) => {
                this.routes[item][url] = callback;
            }
        })
    }

    listen(port, callback, host = '127.0.0.1') {
        const _this = this;
        let server = http.createServer((req, res)=> {
            const pathname = url.parse(req.url).pathname;
            const callback = this.routes[req.method.toLowerCase()][pathname];
            const realPath = routes(req)
            let ext = path.extname(pathname)
            ext = ext ? ext.slice(1) : 'unknown';
            const type = types[ext];
            if (callback) {
                res.writeHead(200, {"Content-Type": type || 'text/html'});
                callback(req, res);
                return;
            }
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

    // initRouter(){
    //
    // }
    // use(obj){
    //     this[]
    // }
}
module.exports = new skyWeb()