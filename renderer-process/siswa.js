let {showAll} = require('../controllers/db')

let mysql = require('mysql')
let config = require('../assets/config')
let conn = mysql.createConnection(config.mysql_config)

// show
let win;
conn.query("SELECT * FROM tabel_siswa", function (err, result) {
    if (err) throw Error

    let data = []
    let tr;
    let dt = 'data data-siswa'

    Array.prototype.forEach.call(result, (e) => {
        return data.push(e)
    })

    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');

        tr.attr('class', dt)

        tr.append("<td>" + data[i].Id + "</td>");
        tr.append("<td class=\"data\">" + data[i].Nama + "</td>")
        tr.append("<td>" + data[i].JK + "</td>");
        tr.append("<td>" + data[i].Agama + "</td>");
        tr.append("<td>" + data[i].NISN + "</td>");
        tr.append("<td>" + data[i].Rombel + "</td>");
        $('#siswa-table').append(tr);
    }

    // let f = document.getElementsByClassName(dt)

    let f = document.getElementsByClassName(dt)
    showAll(f, win, 'siswa', 'siswa')

    $(document).ready(function () {
        $('#siswa-table').DataTable()
    })
})