let { showAll } = require('../controllers/db')
let elec = require('electron')
let { ipcRenderer } = elec || elec.remote

let mysql = require('mysql')
let config = require('../assets/config')
let conn = mysql.createConnection(config.mysql_config)

// Show
let win;
conn.query("SELECT * FROM tabel_guru", function (err, result) {
    if (err) throw Error

    let data = []
    let tr;
    let dt = 'data data-guru';

    Array.prototype.forEach.call(result, (e) => {
        return data.push(e)
    })

    for (let i = 0; i < data.length; i++) {
        tr = $('<tr/>');

        tr.attr('class', dt)

        tr.append("<td>" + data[i].No + "</td>");
        tr.append("<td class=\"data\">" + data[i].Nama + "</td>")
        tr.append("<td>" + data[i].JK + "</td>");
        tr.append("<td>" + data[i].Status_Kepegawaian + "</td>");
        tr.append("<td>" + data[i].Jenis_PTK + "</td>");
        $('#guru-table').append(tr);
    }

    let f = document.getElementsByClassName(dt)
    showAll(f, win, 'return-value', 'guru')

    $(document).ready(function () {
        $('#guru-table').DataTable()
    })
})