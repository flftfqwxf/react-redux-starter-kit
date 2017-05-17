var child_process = require('child_process');

var child = child_process.fork('./sub.js');
child.on('message', function(m) {
    console.log('收到了父进程的消息:', m);
});

//发送消息到子进程
child.send({ hello: 'world' });