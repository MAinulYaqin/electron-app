let electron = require('electron')
let { ipcRenderer } = electron || electron.remote
let { single, deleteData } = require('../../controllers/db')

ipcRenderer.send('data-siswa')
ipcRenderer.on('return-siswa', function (err, arg) {
    console.log('siswa')
    single('tabel_siswa', arg, document.getElementsByClassName('data'))
})

deleteData('siswa', 'tabel_siswa')