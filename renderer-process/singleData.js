var electron, { ipcRenderer } = require('electron')
var mysql, { createConnection } = require('mysql')
var { mysql_config } = require('../assets/config')
var divData = document.getElementsByClassName('data')

// document.getElementById('lol').innerHTML = 

const conn = createConnection(mysql_config)

var argument;
ipcRenderer.send('pesan', 'ping')
ipcRenderer.on('reply-pesan', function (e, arg) {

    conn.query(`SELECT * FROM tabel_guru WHERE Nama=${JSON.stringify(arg)}`, function (err, result) {
        if (err) throw Error

        var data = [];
        Array.prototype.forEach.call(result, (e) => {
            data.push(e)
        })

        Array.prototype.forEach.call(divData, (e) => {
            e.innerHTML = data[0][e.getAttribute('data')]
        })
    })
})