var electron = require('electron');
var {join} = require('path');
var url = require('url');

var {app, BrowserWindow, Menu} = electron;
// var browserWindow = electron.BrowserWindow;
var mainWin, secondWin;

/**
 * 
 * @param {String} f 
    File pathname
 * @param {Number} h 
    Window's height
 * @param {Number} w 
    Window's width
 * @description
 *  Show new window function
 */
function showWindow(f, h, w) {
    // Declared window
    mainWin = new BrowserWindow({
        width: w,
        height: h
    });
    // Look up for the file's pathname
    let file = join(__dirname, f);
    // Window's function
    mainWin.on('close', () => {
        win = null;
    });
    mainWin.loadURL(url.format({
        protocol: 'file',
        pathname: file,
        slashes: true
    }));
    mainWin.show();

    // Menu top bar
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu)
}

const mainMenuTemplate = [{
    label: 'file',
    subMenu: [{
        label: 'Tmabahkan Siswa'
    }, {
        label: 'Hapus Siswa'
    }, {
        label: 'Update Data Siswa'
    }]
}, {
    label: 'close',
    // Check if the platform is mac (darwin) or something else
    accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
    click() {
        app.quit();
    }
}]

app.on('ready', () => {
    showWindow('index.html', 600, 800)
})