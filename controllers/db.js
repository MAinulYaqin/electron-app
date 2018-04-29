// @ts-check

var mysql = require('mysql');
var config = require('../assets/config');
var md5 = require('md5');
var conn = mysql.createConnection(config.mysql_config);
var { getFormData, clearData } = require('../assets/getFormData');

module.exports = {
    /**
     * @param {String} db
        table's name you want to show
     */
    showAll: function (db) {
        conn.query(`SELECT * FROM ${db}`, function (err, result) {
            if (err) throw Error;

            console.log(result)
        })
    },
    /**
     * @param {String} f
       Search data use Nama
     * @param {Object} d
       DOM classname. The data will be showed on div
     * @example
       <div class="data" data="Nama"> Showing table's Nama </div>
       <div class="data" data="JK"> Showing table's JK </div>
       <div class="data" data="Tempat_lahir"> Showing table's Tempat_lahir </div>
     */
    single: function (t,f,d) {
        var id;
        conn.query(`SELECT * FROM ${t} WHERE Nama=${JSON.stringify(f)}`, (err, result) => {
            if (err) throw Error
    
            let data = [];
            Array.prototype.forEach.call(result, (e) => {
                data.push(e)
            })

            Array.prototype.forEach.call(d, (e) => {
                e.innerHTML = data[0][e.getAttribute('data')]
            })
            
            d[1].textContent === 'L' ? d[1].innerHTML = 'Laki-laki' : d[1].innerHTML = 'Perempuan'
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
        
        conn.query(`INSERT INTO ${g} SET ?`, JSON.parse(data), function (err, result, fields) {
            if (err) throw Error;

            console.log(result.affectedRows);
            clearData(document.getElementById(f))
        });
    },
    delete: function (f, g) {
        var data = JSON.parse(f)
        conn.query(`DELETE FROM ${g} SET ?`, f, (err, result) => {
            if (err) throw Error;

            console.log(result.affectedRows);
            console.log(result);
        })
    },
    update: function (f, g) {
        var data = JSON.parse(f);
        conn.query(`UPDATE ${g} SET ?`, data, (err, result) => {
            if (err) throw Error;

            console.log('affected Rows', result.affectedRows);
            console.log(data)
        })
    }
}