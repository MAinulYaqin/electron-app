let {showAll} = require('../controllers/db')
let mysql = require('mysql')
let config = require('../assets/config')
let conn = mysql.createConnection(config.mysql_config)

let win;
conn.query("SELECT * FROM tabel_tendik", function (err, result) {
    if (err) throw Error

    let data = []
    let tr;
    let dt = 'data data-tendik'

    Array.prototype.forEach.call(result, (e) => {
        return data.push(e)
    })

    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');

        tr.attr('class', dt)

        tr.append("<td>" + data[i].Id + "</td>");
        tr.append("<td class=\"data\">" + data[i].Nama + "</td>")
        tr.append("<td>" + data[i].JK + "</td>");
        tr.append("<td>" + data[i].Status_Kepegawaian + "</td>");
        tr.append("<td>" + data[i].Jenis_PTK + "</td>");
        $('#tendik-table').append(tr);
    }

    // let f = document.getElementsByClassName(dt)

    let f = document.getElementsByClassName(dt)
    showAll(f, win, 'tendik', 'tendik')

    $(document).ready(function () {
        $('#tendik-table').DataTable()
    })
})