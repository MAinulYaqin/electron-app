// @ts-check

var mysql = require('mysql');
var config = require('../assets/config');
var md5 = require('md5');
var conn = mysql.createConnection(config.mysql_config);
var { join } = require('path')
var { getFormData } = require('../assets/getFormData');

module.exports = {
    Login: (f) => {
        let data = getFormData(f);
        conn.query(`SELECT id FROM akun_guru WHERE username=${JSON.stringify(data.username)} and password=${JSON.stringify(data.password)}`, (err, result) => {
            if (err) throw Error

            let id;
            Array.prototype.forEach.call(result, (e) => {
                id = e.id
            })

            if (id === undefined) {
                alert(":p Im sorry but your username and password not found in our database")
            } else {
                document.location.href = join(__dirname, '../index.html');
            }
        })
    }
}