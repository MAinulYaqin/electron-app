"use strict";
var config = require('../../assets/config');
var mysql = require('mysql')
var connection = mysql.createConnection(config.mysql_config)

module.exports = {
    show: function () {
        connection.query("SELECT * FROM tabel_siswa", function (err, result) {
            if (err) throw new Error('Kesalahan pada show');
            return result
        })
    },
    create: function (data) {
        connection.query("INSERT INTO tabel_siswa SET ?", data ,function (err, result, field) {
            if (err) throw new Error('Kesalahan pada create');
            console.log(result)
        })
    },
    update: function () {
        connection.query("UPDATE tabel_siswa SET nama_siswa='Joo Nathan' WHERE id=3", function (err, result, field) {
            if (err) throw new Error('Kesalahan pada update');
            console.log(result);
        })
    },
    delete: function () {
        connection.query("DELETE FROM tabel_siswa WHERE nama_siswa='Joo Nathan'", function (err, result, field) {
            if (err) throw new Error('Kesalahan pada delete');
            console.log('Deleted' + result.affectedRows + 'rows')
        })
    }
}