// @ts-check

var mysql = require('mysql');
var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config);

module.exports = {
    update : function (f, g) {
        var data = JSON.parse(f);
        connection.query(`UPDATE ${g} SET ?`, data, (err, result) => {
            if (err) throw Error;

            console.log('affected Rows', result.affectedRows);
            console.log('=======================');
            console.log(data)
        })
    }
}