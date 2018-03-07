var mysql = require('mysql');
var md5 = require('md5');
var {join} = require('path');

var config = require('../assets/config');
var {getFormData} = require('../assets/getFormData');
var connection = mysql.createConnection(config.mysql_config)

var form = document.getElementById('login')

document.getElementById('btn1').addEventListener('click', function (e) {
    e.preventDefault();
    
    let data = getFormData(form);

    connection.query(`SELECT id FROM akun_guru WHERE username=${JSON.stringify(data.username)} and password=${JSON.stringify(data.password)}`, function (err, result, fields) {
        if (err) throw new Error

        Array.prototype.forEach.call(result, (e) => {
            console.log(e.id)
        })

        document.location.href = join(__dirname, '../index.html');
    })
})