var container = document.getElementById('container')
var loader = document.getElementById('circle-loader')
var { singleData } = require('../controllers/window')
var electron, { ipcRenderer } = require('electron')

var mysql = require('mysql');
var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config)

// Loader
setTimeout(function () {
    loader.style.display = 'none';
    container.style.visibility = 'visible'
}, 2000);


var win, unique;
// Show
connection.query("SELECT * FROM tabel_guru", function (err, result) {
    if (err) throw Error

    var data = []
    var tr;

    Array.prototype.forEach.call(result, function (e) {
        return data.push(e)
    })

    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');

        tr.attr('class', 'singleData')

        tr.append("<td>" + data[i].No + "</td>");
        tr.append("<td class=\"data\">" + data[i].Nama + "</td>")
        tr.append("<td>" + data[i].JK + "</td>");
        tr.append("<td>" + data[i].Status_Kepegawaian + "</td>");
        tr.append("<td>" + data[i].Jenis_PTK + "</td>");
        $('#guru-table').append(tr);

        // console.log(typeof data[i].JK)
    }

    let f = document.getElementsByClassName('singleData')

    Array.prototype.forEach.call(f, (e) => {
        e.addEventListener('click', () => {
            console.log(e.children[1].textContent)
            console.log(e)
            ipcRenderer.send('return-value', e.children[1].textContent)
            singleData(win, 'sections/singleData/singleData.html')
        })
    })

    $(document).ready(function () {
        $('#guru-table').DataTable()
    })
})