// @ts-check
var mysql = require('mysql');
var config = require('../assets/config');
var conn = mysql.createConnection(config.mysql_config);
var { ipcRenderer } = require('electron');
var { join } = require('path');
var a = require('../assets/getFormData');

module.exports = {
    Login: (f) => {
        let data = a.getFormData(f);
        conn.query(`SELECT id, username FROM akun_guru WHERE username=${JSON.stringify(data.username)} and password=${JSON.stringify(data.password)}`, (err, result) => {
            if (err) throw Error

            let id = []
            Array.prototype.forEach.call(result, (e) => {
                id.push(e)
            })

            if (id[0]['id'] === undefined) {
                alert(":p Im sorry but your username and password not found in our database")
            } else {
                ipcRenderer.send('username', id[0]['username'])
                document.location.href = join(__dirname, '../index.html');
            }
        })
    }
}