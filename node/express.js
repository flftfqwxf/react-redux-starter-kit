var express = require('express');
var app = express();
var fs=require('fs')

app.get('/', function(req, res){
    // console.log(req.acceptsEncodings)
    // console.log(req.query)

    setTimeout(()=> {
        throw new Error('this is error')
    }, 500)
  // fs.readFile('aa.txt','utf8',function(err, data) {
  //     if (err) {
  //         res.send(err);
  //
  //
  //     }
  // })
    // res.send('hello world');
});

app.listen(3000);