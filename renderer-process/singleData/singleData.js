let electron = require('electron')
let { ipcRenderer } = electron || electron.remote
let { single } = require('../../controllers/db')

ipcRenderer.send('pesan')
ipcRenderer.on('reply-pesan', function (err, arg) {
    console.log('pesan')
    single('tabel_guru', arg, document.getElementsByClassName('data'))
})