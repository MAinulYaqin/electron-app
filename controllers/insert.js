// @ts-check

var mysql = require('mysql');
var config = require('../assets/config');
var md5 = require('md5');
var connection = mysql.createConnection(config.mysql_config);
var {getFormData} = require('../assets/getFormData');

module.exports = {
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
    }
}