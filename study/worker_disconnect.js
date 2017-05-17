var cluster = require('cluster')
var net = require('net')
var worker;
if (cluster.isMaster) {
    console.log('this is master')
    worker = cluster.fork();
    let timeout;
    worker.on('listening', (address) => {
        worker.send('shutdown');
        // worker.disconnect();
        // timeout = setTimeout(() => {
        //     worker.kill();
        // }, 20000);
    });
    worker.on('disconnect', () => {
        clearTimeout(timeout);
    });
} else if (cluster.isWorker) {
    console.log('this is worker')
    const net = require('net');
    const server = net.createServer((socket) => {
        // connections never end
    });
    server.listen(8000);
    process.on('message', (msg) => {
        if (msg === 'shutdown') {
            console.log(worker)
            // initiate graceful close of any connections to server
        }
    });
}