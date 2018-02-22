// @ts-check

var mysql = require('mysql');
var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config);

module.exports = {
    delete : function (f, g) {
        var data = JSON.parse(f)
        connection.query(`DELETE FROM ${g} SET ?`, f, (err, result) => {
            if (err) throw Error;

            console.log(result.affectedRows);
            console.log('=======================');
            console.log(result);
        })
    }
}