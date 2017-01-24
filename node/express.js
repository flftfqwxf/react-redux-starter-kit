var express = require('express');
var app = express();


app.get('/', function(req, res){
    // console.log(req.acceptsEncodings)
    // console.log(req.query)
    res.send('hello world');
});

app.listen(3000);