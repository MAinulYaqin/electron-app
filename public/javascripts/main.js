var electron = require('electron');
var browserWindow = electron.remote.BrowserWindow;
var url = require('url');
var join = require('path').join;
// Controllers
var windowController = require('../../controllers/window');

var win;
document.getElementById('btn1').addEventListener('click', function () {
    // file location
    var file = join(__dirname, '../../index2.html')
    win = new browserWindow({ width: 400, height: 500 });

    win.on('closed', () => { win = null })
    win.loadURL(url.format({
        pathname: file,
        protocol: 'file',
        slashes: true
    }))
    win.show();
});