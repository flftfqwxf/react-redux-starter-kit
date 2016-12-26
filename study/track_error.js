// //抛出一个异步异常
// function callbackError() {
//     setTimeout(function() {
//         throw new Error("一个异步异常");
//     }, 1)
// }
// try {
//     callbackError();
// } catch (err) {
//     console.log(err);
// }
// // process.on('uncaughtException', function(err) {
// //     console.log(err);
// // });

var domain = require('domain');

//抛出一个异步异常
function callbackError() {
    setTimeout(function(){
        throw new Error("一个异步异常");
    }, 10)
}

var d = domain.create();
d.on('error',function(err){
    console.log(err);
});

d.run(callbackError);