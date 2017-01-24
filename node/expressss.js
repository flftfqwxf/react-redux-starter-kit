// var express = require('express');
// var app = express();
// app.get('/', function(req, res){
//     console.log(req.query)
//     res.send('hello world');
// });
//
// app.listen(3000);
const log = require('gutil-color-log');

const http = require('http');

var req = {
    __proto__: http.IncomingMessage.prototype
};
var app = function(req, res) {
    req.query()
}
app.request = {__proto__: req}
req.query = function() {
    console.log('query');
}
class skyWeb {
    listen(port, callback, host = '127.0.0.1') {
        const _this = this;
        // app.request = { __proto__: req, app: app };
        let server = http.createServer(app)
        server.listen(port, host, function() {
            log('green', 'server has started')
            log('green', 'http://' + host + ':' + port)
        });
    }

    // initRouter(){
    //
    // }
    // use(obj){
    //     this[]
    // }
}
 new skyWeb().listen(8588)