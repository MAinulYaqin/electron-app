"use strict";

var queryShow = `SELECT * FROM tabel_siswa`;
var queryCreate = `INSERT INTO tabel_siswa SET (nama_siswa, kelas, kelamin, alamat, ttl) VALUES ()`;
var queryUpdate = `"UPDATE tabel_siswa SET nama_siswa='Joo Nathan' WHERE id=3"`;
var queryDelete = `DELETE FROM tabel_siswa WHERE nama_siswa='Joo Nathan'`;

module.exports = {
    show: connection.query(queryShow, function (err, result, field) {
        if (err) throw new Error('Kesalahan pada show');
        console.log(result);
    }),
    create: connection.query(queryCreate, function (err, result, field) {
        if (err) throw new Error('Kesalahan pada create');
        console.log(result)
    }),
    update: connection.query(queryUpdate, function (err, result, field) {
        if (err) throw new Error('Kesalahan pada update');
        console.log(result);
    }),
    delete: connection.query(queryDelete, function (err, result, field) {
        if (err) throw new Error('Kesalahan pada delete');
        console.log('Deleted' + result.affectedRows + 'rows')
    })
}