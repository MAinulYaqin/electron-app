let { singleData } = require('../controllers/window')
let { showWindow } = require('../controllers/window')
let elec = require('electron')
let { ipcRenderer } = elec || elec.remote

let container = document.getElementById('container')
let usrname = document.getElementById('username-profile')

let l = document.getElementById('logout-btn')
l.addEventListener('click', (e) => {
    e.preventDefault()

    document.location.href = './sections/login/login.html';
})

// showing username
ipcRenderer.send('usrname')
ipcRenderer.on('usrname-render', (e, data) => {
    usrname.textContent = data
})

showForm('guru')
showForm('tendik')

function showForm (f) {
    Array.prototype.forEach.call(document.querySelectorAll(`.tambah.${f}`), (e) => {
        let n;
        e.addEventListener('click', () => {
            showWindow(n, `./sections/${f}/create-${f}.html`)
        })
    })
}