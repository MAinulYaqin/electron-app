// @ts-check

var mysql = require('mysql');
var config = require('../assets/config');
var md5 = require('md5');
var connection = mysql.createConnection(config.mysql_config);
var { getFormData } = require('../assets/getFormData');

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

            
        })
    },
    /**
     * @param {String} f
        form's id
     * @param {String} g
        table's name
     */
    insert: function (f, g) {
        // Get form's id
        let params = getFormData(document.getElementById(f));
        // Change data to string and display it
        let data = JSON.stringify(params, null, '');
        // document.getElementById('result').innerHTML = data;
        // Check the data | development
        console.log(JSON.parse(data))

        // Insert into database (query), then parsing the data back to JSON
        // after it, check affected rows with console.log
        connection.query(`INSERT INTO ${g} SET ?`, JSON.parse(data), function (err, result, fields) {
            if (err) throw Error;

            console.log(result.affectedRows);
        });
    },
    delete: function (f, g) {
        var data = JSON.parse(f)
        connection.query(`DELETE FROM ${g} SET ?`, f, (err, result) => {
            if (err) throw Error;

            console.log(result.affectedRows);
            console.log('=======================');
            console.log(result);
        })
    },
    update: function (f, g) {
        var data = JSON.parse(f);
        connection.query(`UPDATE ${g} SET ?`, data, (err, result) => {
            if (err) throw Error;

            console.log('affected Rows', result.affectedRows);
            console.log('=======================');
            console.log(data)
        })
    }
}