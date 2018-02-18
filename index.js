var electron = require('electron');
var express = require('express');
var mysql = require('mysql');
var url = require('url');

var {join} = require('path');
var {app, BrowserWindow, Menu} = electron
var config = require('./assets/config');
var connection = mysql.createConnection(config.mysql_config)

connection.connect(connection);

// Empty variable for windows
var mainWin;
const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Exit',
        click() { app.quit(); }  
    }]
}, {
    label: 'Siswa',
    submenu: [{
        label: 'Tambahkan Siswa'
    }, {
        label: 'Ubah Data Siswa'
    }, {
        label: 'Hapus Siswa'
    }]
}, {
    label: 'Guru',
    submenu: [{
        label: 'Tambahkan Guru',
        click() { mainWindow(secondWin, './sections/index2.html', 400, 500) }
    }, {
        label: 'Ubah Data Guru'
    }, {
        label: 'Hapus Data Guru'
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

function mainWindow () {
    // create window
    mainWin = new BrowserWindow()
    // Look up for the file's pathname
    let file = join(__dirname, 'index.html')
    // Another setting for window
    mainWin.loadURL(url.format({
        pathname: file,
        protocol: 'file',
        slashes: true
    }))
    // Show & close the app
    let menuTemplate;
    menuTemplate = Menu.buildFromTemplate(mainMenuTemplate)
        Menu.setApplicationMenu(menuTemplate)

    mainWin.on('closed', () => { 
        mainWin = null;
        connection.end()
     })
    mainWin.show()
}

app.on('ready', () => {
    mainWindow()
})