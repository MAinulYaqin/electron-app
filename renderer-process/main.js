let { singleData } = require('../controllers/window')
let { showWindow } = require('../controllers/window')
let elec = require('electron')
let { ipcRenderer } = elec || elec.remote

let container = document.getElementById('container')
let usrname = document.getElementById('username-profile')

// Logout btn
let l = document.getElementById('logout-btn')
l.addEventListener('click', (e) => {
    e.preventDefault()

    document.location.href = '../login/login.html';
})

// showing username
ipcRenderer.send('usrname')
ipcRenderer.on('usrname-render', (e, data) => {
    usrname.textContent = data
})

// showing adding form when clicked
showForm('guru')
showForm('tendik')
showForm('siswa')

function showForm (f) {
    Array.prototype.forEach.call(document.querySelectorAll(`.tambah.${f}`), (e) => {
        let n;
        e.addEventListener('click', () => {
            showWindow(n, `./sections/${f}/create-${f}.html`)
        })
    })
}