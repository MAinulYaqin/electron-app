var electron = require('electron');
var {join} = require('path');
var url = require('url');

var {app, BrowserWindow, Menu} = electron;
var config = require('./config');
var mainWin, secondWin;

/**
 *
 * @param {Variable} window
    You must have one empty variable to create window.
    simply.. one window is equal to one empty variable
 * @param {String} f 
    File pathname
 * @param {Number} h 
    Window's height
 * @param {Number} w 
    Window's width
 * @description
 *  Function to create new window
 */
function showWindow(window ,f, h, w) {
    // Declared window
    window = new BrowserWindow({
        width: w,
        height: h
    });
    // Look up for the file's pathname
    let file = join(__dirname, f);
    // Window's function
    window.on('close', () => { window = null; });
    window.on('closed', () => { app.quit(); })
    window.loadURL(url.format({
        protocol: 'file',
        pathname: file,
        slashes: true
    }));
    window.show();
    // Menu top bar
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu)
}

const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Tambahkan Siswa',
        click() { showWindow(secondWin, 'index2.html', 400, 500) }
    }, {
        label: 'Hapus Siswa'
    }, {
        label: 'Update Data Siswa'
    }, {
        label: 'Exit',
        click() { app.quit(); }
    }]
}, {
    // Check if the platform is mac (darwin) or something else
    accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
    click() {
        app.quit();
    }
}]

console.log(mainMenuTemplate.length)
// Another setting for mac
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

if (config.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
            label: 'Toggle Developer Tools',
            accelerator: config.toggle_devTools,
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }, {
            label: 'Reload',
            role: 'reload'
        }]
    })
}

app.on('ready', () => {
    showWindow(mainWin ,'index.html', 600, 800)
})