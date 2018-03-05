var electron, { ipcRenderer } = require('electron')

ipcRenderer.send('pesan', 'ping')
ipcRenderer.on('reply-pesan', function (e, arg) {
    console.log(arg)
})

console.log('Hi There :D')