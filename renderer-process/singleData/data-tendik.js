let electron = require('electron')
let { ipcRenderer } = electron || electron.remote
let {single,deleteData} = require('../../controllers/db')

ipcRenderer.send('data-tendik')
ipcRenderer.on('return-tendik', function (err, arg) {
    console.log('tendik')
    single('tabel_tendik', arg, document.getElementsByClassName('data'))
})

deleteData('tendik', 'tabel_tendik')