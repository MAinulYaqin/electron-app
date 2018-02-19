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

// Show
connection.query("SELECT * FROM tabel_guru", function (err, result) {
    if (err) throw Error
    result.forEach(function (e) {
        var table = document.getElementById('guru-table')
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        var nama = document.createTextNode(e.nama_guru)
        var kelamin = document.createTextNode(e.kelamin)
        var ttl = document.createTextNode(e.ttl)
        var alamat = document.createTextNode(e.alamat)
        var mapel = document.createTextNode(e.mapel)
        var wakil_kls = document.createTextNode(e.wakil_kls)

        table.appendChild(tr)
        tr.appendChild(td)
        td.appendChild(nama)
        td.appendChild(kelamin)
        td.appendChild(ttl)
        td.appendChild(alamat)
        td.appendChild(mapel)
        td.appendChild(wakil_kls)
    })
})

connection.query("SELECT * FROM tabel_mapel", function (err, result) {
    if (err) throw Error
    result.forEach(function (e) {
        var table = document.getElementById('mapel-table')
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        var guru_pengajar = document.createTextNode(e.guru_pengajar)
        var mapel = document.createTextNode(e.mapel)

        table.appendChild(tr)
        tr.appendChild(td)
        td.appendChild(mapel)
        td.appendChild(guru_pengajar)
    })
})