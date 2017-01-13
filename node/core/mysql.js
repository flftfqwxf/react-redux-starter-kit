var mysql = require('promise-mysql');
const config = require('../config').mysql
var connection;
function db() {
    mysql.createPool(
        config
    ).then(function(conn) {
        connection = conn;
    })
}
module.exports