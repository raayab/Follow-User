
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;