// @ts-check

var mysql = require('mysql');
var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config);

module.exports = {
    /**
     * @param {String} db
        table's name you want to show
     */
    showAll: function (db) {
        connection.query(`SELECT * FROM ${db}`, function (err, result) {
            if (err) throw Error;

            console.log(result)
        })
    },
    /**
     * @param {String} db
       table's name you want to show
     */
    single: function (db) {
        var id;
        document.getElementById('someButton').addEventListener('click', function (e) {
            e.preventDefault();

            console.log(this.id);
            id = this.id;
        });
        connection.query(`SELECT * FROM ${db} WHERE id= ${id}`, function (err, result) {
            if (err) throw Error;

            console.log(result);
            console.log('=======================');
        })
    }
}