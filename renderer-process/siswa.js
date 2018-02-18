var mysql = require('mysql');
var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config)

connection.query("SELECT * FROM tabel_siswa", function (err, result) {
    if (err) throw Error
    result.forEach(function (e) {
        var table = document.getElementById('siswa-table')
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        var nama = document.createTextNode(e.nama_siswa)
        var kelas = document.createTextNode(e.kelas)
        var kelamin = document.createTextNode(e.kelamin)
        var alamat = document.createTextNode(e.alamat)
        var ttl = document.createTextNode(e.ttl)

        table.appendChild(tr)
        tr.appendChild(td)
        td.appendChild(nama)
        td.appendChild(kelas)
        td.appendChild(kelamin)
        td.appendChild(alamat)
        td.appendChild(ttl)
    })
})