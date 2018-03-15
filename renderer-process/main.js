var container = document.getElementById('container')
var usernameProfile = document.getElementById('username-profile')
var { singleData } = require('../controllers/window')
var elec = require('electron')

var mysql = require('mysql')
var config = require('../assets/config')
var connection = mysql.createConnection(config.mysql_config)


elec.ipcRenderer.send('username-renderer', '')
elec.ipcRenderer.on('send-data', function (err, arg) {
    console.log(arg)
    usernameProfile.textContent = arg
})

// Show
var win, unique;
connection.query("SELECT * FROM tabel_guru", function (err, result) {
    if (err) throw Error

    var data = []
    var tr;

    Array.prototype.forEach.call(result, function (e) {
        return data.push(e)
    })

    // usernameProfile.innerHTML = 

    for (var i = 0; i < data.length; i++) {
        tr = $('<tr/>');

        tr.attr('class', 'singleData')

        tr.append("<td>" + data[i].No + "</td>");
        tr.append("<td class=\"data\">" + data[i].Nama + "</td>")
        tr.append("<td>" + data[i].JK + "</td>");
        tr.append("<td>" + data[i].Status_Kepegawaian + "</td>");
        tr.append("<td>" + data[i].Jenis_PTK + "</td>");
        $('#guru-table').append(tr);
    }

    let f = document.getElementsByClassName('singleData')
    let l = document.getElementById('logout-btn')
    l.addEventListener('click', function (e) {
        e.preventDefault()

        document.location.href = './sections/login/login.html'
    })

    Array.prototype.forEach.call(f, (e) => {
        e.addEventListener('click', () => {
            elec.ipcRenderer.send('return-value', e.children[1].textContent)
            singleData(win, 'sections/singleData/singleData.html')
        })
    })

    $(document).ready(function () {
        $('#guru-table').DataTable()
    })
})