let electron = require('electron')
let { ipcRenderer } = electron || electron.remote
let { single, deleteData } = require('../../controllers/db')

ipcRenderer.send('pesan')
ipcRenderer.on('reply-pesan', function (err, arg) {
    single('tabel_guru', arg, document.getElementsByClassName('data'))
})

deleteData('guru', 'tabel_guru')