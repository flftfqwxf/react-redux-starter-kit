const http = require('http')
function wait(millisec) {
    var now = new Date;
    while (new Date - now <= millisec) ;
}
http.createServer((req, res)=> {
    if (req.url === '/') {
        res.writeHead(200, {"Content-Type": 'text/html'});
        res.write('home')
        res.end()
    }
    if (req.url === '/a') {
        wait(5000)
        console.log('a');
        res.writeHead(200, {"Content-Type": 'text/html'});
        res.write('a')
        res.end()
    }
    if (req.url === '/b') {
        setTimeout(()=> {
            res.writeHead(200, {"Content-Type": 'text/html'});
            res.write('b')
            res.end()
        }, 5000)
        console.log('b');
    }
}).listen(8055, "127.0.0.1", function() {
    console.log('server start at http://127.0.0.1:8055')
})