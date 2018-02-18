var mysql = require('mysql');
var config = require('../../assets/config');
var connection = mysql.createConnection(config.mysql_config)

module.exports = {
    show: function () {
        connection.query("SELECT * FROM table_guru", (err, result, fields) => {
            if (err) throw Error
            console.log(result);
        })
    },
    create: function (data) {
        connection.query("INSERT INTO tabel_guru SET ?", data, (err, result, fields) => {
            if (err) throw Error
            console.log(result)
        })
    }
}