var electron, { ipcRenderer } = require('electron')
var { single } = require('../controllers/db')

var argument;
ipcRenderer.send('pesan', 'ping')
ipcRenderer.on('reply-pesan', (err, arg) => {
    single(arg, document.getElementsByClassName('data'))
})