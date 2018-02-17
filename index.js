var electron = require('electron');
var {join} = require('path');
var url = require('url');

var {app, BrowserWindow, Menu} = electron
var config = require('./assets/config');
// Empty variable for windows
var mainWin, secondWin;

const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Tambahkan Siswa',
        click() { mainWindow(secondWin, 'index2.html', 400, 500) }
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
    accelerator: config.close_app,
    click() {
        app.quit();
    }
}]

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

function mainWindow (win, f, w, h, maxW, maxH) {
    // create window
    win = new BrowserWindow({
        width: w,
        height: h,
        maxWidth: maxW,
        maxHeight: maxH
    })
    // Look up for the file's pathname
    let file = join(__dirname, f)
    // Another setting for window
    win.loadURL(url.format({
        pathname: file,
        protocol: 'file',
        slashes: true
    }))
    // Show & close the app
    win.on('closed', () => { win = null })
    win.show()
}

function setApplicationMenus (menus) {
    // Set application's menus
    let menuTemplate;
    if (menus == undefined || menus.length < 0 || menus == null) {
        return
    } else {
        menuTemplate = Menu.buildFromTemplate(menus)
        Menu.setApplicationMenu(menuTemplate)
    }
}

app.on('ready', () => {
    mainWindow(mainWin, 'index.html')
    setApplicationMenus(mainMenuTemplate)
})