const http = require('http');
const url = require('url');
const path = require('path');
const log = require('gutil-color-log');
const types = require('./mimetype').types;
const fs = require('fs');
const routes = require('./route');
const methods = require('methods');
const request = require('./request');
const response = require('./response');
var pathToRegexp = require('path-to-regexp');
var debug = require('debug')('sql');
const qs = require('querystring');
const domain = require('domain')
class skyWeb {
    constructor() {
        this.methods = {};
        this.routes = {};
        let _this = this;
        methods.forEach((method)=> {
            this.routes[method] = []
            /**
             * 将所有请求类型设置成 this.get(url,callback),this.post(url,callback)
             * @param url
             * @param callback
             */
            this[method] = (url, callback) => {
                var re = pathToRegexp(url, _this.keys = []);
                this.routes[method].push({
                    url: url,
                    regexp: re,
                    callback: callback,
                    keys: _this.keys
                });
            }
        })
    }

    decode_param(val) {
        if (typeof val !== 'string' || val.length === 0) {
            return val;
        }
        try {
            return decodeURIComponent(val);
        } catch (err) {
            if (err instanceof URIError) {
                err.message = 'Failed to decode param \'' + val + '\'';
                err.status = err.statusCode = 400;
            }
            throw err;
        }
    }

    wait(millisec) {
        var now = new Date;
        while (new Date - now <= millisec) ;
    }

    listen(port, callback, host = '127.0.0.1') {
        const _this = this;
        // app.request = { __proto__: req, app: app };
        let server = http.createServer((req, res)=> {
            let d = domain.create()
            d.on('error', (error)=> {
                console.log(error.message)
                res.writeHead(200, {"Content-Type": 'text/html'});
                res.write(error.message);
                res.end()
            })
            d.add(res)
            d.add(req)
            d.run(function() {
                handleRequest(req, res)
            })
            // console.log(req.url)
            //
            // if (req.url === '/') {
            //     // console.log(req.url)
            //     this.wait(5000)
            // }
            function handleRequest(req, res) {
                const pathname = url.parse(req.url).pathname;
                const routeList = _this.routes[req.method.toLowerCase()]
                let route
                let params = {};
                _this.body = [];
                let hasBody = false;
                const realPath = routes(req)
                let ext = path.extname(pathname)
                ext = ext ? ext.slice(1) : 'unknown';
                const type = types[ext];
                routeList.some((item, index)=> {
                    // console.log(route)
                    let m = item.regexp.exec(pathname)
                    if (m) {
                        for (var i = 1; i < m.length; i++) {
                            var key = item.keys[i - 1];
                            var prop = key.name;
                            var val = _this.decode_param(m[i]);
                            if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
                                params[prop] = val;
                            }
                        }
                        _this.params = params;
                        req.params = params;
                        route = item;
                        if (req.method !== 'GET') {
                            hasBody = true;
                            let body = '';
                            req.on('data', function(data) {
                                body += data;
                                // Too much POST data, kill the connection!
                                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                                if (body.length > 1e6)
                                    req.connection.destroy();
                            });
                            req.on('end', function() {
                                // req.body = qs.parse(body);
                                req.body = body;
                                if (route && route.callback) {
                                    res.writeHead(200, {"Content-Type": type || 'text/html'});
                                    // req.__proto__ = request;
                                    route.callback(req, res);
                                    // route.callback(Object.assign({}, req, request), res);
                                }
                                // use post['blah'], etc.
                            });
                        }
                        return true;
                    }
                })
                if (!hasBody) {
                    if (route && route.callback) {
                        res.writeHead(200, {"Content-Type": type || 'text/html'});
                        req.__proto__ = request;
                        route.callback(req, res);
                        // route.callback(Object.assign({}, req, request), res);
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
                }
            }
        })
        server.listen(port, host, function() {
            log('green', 'server has started')
            log('green', 'http://' + host + ':' + port)
            // process.on('uncaughtException', function(err) {
            //     _this.res.writeHead(200, {"Content-Type": 'text/html'});
            //     _this.res.write(err.message)
            //     _this.res.end()
            //     console.log(err.message);
            // });
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