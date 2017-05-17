
function wait(millisec) {
    var now = new Date;
    while (new Date - now <= millisec) ;
    //向父进程发送消息
    process.send({ foo: 'bar' });
}
wait(5000)
