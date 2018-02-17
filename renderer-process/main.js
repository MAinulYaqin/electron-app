var btn = document.getElementById('btn1')
var electron = require('electron')
var windowController = require('../controllers/window')

var win;
btn.addEventListener('click', (e) => {
    e.preventDefault();
    windowController.showWindow(win, 'index2.html', 400, 500)
})