let md5 = require('md5')
let { singleData } = require('../controllers/window')
let { showWindow } = require('../controllers/window')
let elec = require('electron')
let electron, { ipcRenderer } = elec || elec.remote

let container = document.getElementById('container')
let usrname = document.getElementById('username-profile')

let mysql = require('mysql')
let config = require('../assets/config')
let connection = mysql.createConnection(config.mysql_config)


ipcRenderer.send('usrname')
ipcRenderer.on('usrname-render', (e, data) => {
    usrname.textContent = data
})

// Logout btn
let l = document.getElementById('logout-btn')
l.addEventListener('click', (e) => {
    e.preventDefault()

    document.location.href = './sections/login/login.html'
})

// Tambah guru
Array.prototype.forEach.call(document.querySelectorAll('.tambah.guru'), (e) => {
    let n;
    e.addEventListener('click', () => {
        showWindow(n, 'sections/guru/create-guru.html')
    })
})
// Tambah tenaga pendidik
Array.prototype.forEach.call(document.querySelectorAll('.tambah.tendik'), (e) => {
    let n;
    e.addEventListener('click', () => {
        showWindow(n, 'sections/tendik/create-tendik.html')
    })
})

// Show
let win;
connection.query("SELECT * FROM tabel_guru", function (err, result) {
    if (err) throw Error

    let data = []
    let tr;
    let dt = 'data data-guru';

    Array.prototype.forEach.call(result, (e) => {
        return data.push(e)
    })

    for (var i = 0; i < data.length; i++) {
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
    Array.prototype.forEach.call(f, (e) => {
        e.addEventListener('click', () => {
            ipcRenderer.send('return-value', e.children[1].textContent)
            console.log(e.children[1].textContent)
            singleData(win, 'sections/singleData/singleData.html')
        })
    })

    $(document).ready(function () {
        $('#guru-table').DataTable()
    })
})

let win2;
connection.query("SELECT * FROM tabel_tendik", function (err, result) {
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

        tr.append("<td>" + data[i].No + "</td>");
        tr.append("<td class=\"data\">" + data[i].Nama + "</td>")
        tr.append("<td>" + data[i].JK + "</td>");
        tr.append("<td>" + data[i].Status_Kepegawaian + "</td>");
        tr.append("<td>" + data[i].Jenis_PTK + "</td>");
        $('#tendik-table').append(tr);
    }

    // let f = document.getElementsByClassName(dt)

    let f = document.getElementsByClassName(dt)
    Array.prototype.forEach.call(f, (e) => {
        e.addEventListener('click', () => {
            ipcRenderer.send('tendik', e.children[1].textContent)
            console.log(e.children[1].textContent)
            singleData(win2, 'sections/singleData/data-tendik.html')
        })
    })

    $(document).ready(function () {
        $('#tendik-table').DataTable()
    })
})

let win3;
connection.query("SELECT * FROM tabel_siswa", function (err, result) {
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

        tr.append("<td>" + data[i].No + "</td>");
        tr.append("<td class=\"data\">" + data[i].Nama + "</td>")
        tr.append("<td>" + data[i].JK + "</td>");
        tr.append("<td>" + data[i].NISN + "</td>");
        tr.append("<td>" + data[i].Rombel + "</td>");
        $('#siswa-table').append(tr);
    }

    // let f = document.getElementsByClassName(dt)

    let f = document.getElementsByClassName(dt)
    Array.prototype.forEach.call(f, (e) => {
        e.addEventListener('click', () => {
            ipcRenderer.send('siswa', e.children[1].textContent)
            console.log(e.children[1].textContent)
            singleData(win2, 'sections/singleData/data-siswa.html')
        })
    })

    $(document).ready(function () {
        $('#siswa-table').DataTable()
    })
})