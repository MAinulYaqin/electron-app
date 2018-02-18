var mysql = require('mysql');
var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config)

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