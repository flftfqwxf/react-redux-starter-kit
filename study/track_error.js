// //抛出一个异步异常
function callbackError() {
    setTimeout(function() {
        throw new Error("一个异步异常");
    }, 1)
}
try {
    callbackError();
} catch (err) {
    console.log(err);
}
process.on('uncaughtException', function(err) {
    console.log(err);
    console.log('444')
});
// var domain = require('domain');
// //抛出一个异步异常
// function callbackError() {
//     setTimeout(function() {
//         throw new Error("一个异步异常");
//     }, 10)
// }
// function track_error() {
//     try {
//         callbackError()
//     } catch (e) {
//         //无法进入此处
//         // console.log(e)
//         console.log(3)
//     }
// }
// track_error()
// var d = domain.create();
// d.on('error', function(err) {
//     //在此处捕获到错误
//     console.log(err);
// });
// d.run(callbackError);