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
var mainWin, tambah, ubah, hapus;
const mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Exit',
        click() { app.quit(); }  
    }]
}, {
    label: 'Siswa',
    submenu: [{
        label: 'Tambahkan Siswa',
        click() { mainWindow(tambah, 'sections/siswa/create-siswa.html', 400, 500) }
    }, {
        label: 'Ubah Data Siswa',
        click() { mainWindow(ubah, 'sections/siswa/create-siswa.html', 400, 500) }
    }, {
        label: 'Hapus Siswa',
        click() { mainWindow(hapus, 'sections/siswa/create-siswa.html', 400, 500) }
    }]
}, {
    label: 'Guru',
    submenu: [{
        label: 'Tambahkan Guru',
        click() { mainWindow(tambah, 'sections/guru/create-guru.html', 400, 500) }
    }, {
        label: 'Ubah Data Guru',
        click() { mainWindow(ubah, 'sections/guru/update-guru.html', 400, 500) }
    }, {
        label: 'Hapus Data Guru',
        click() { mainWindow(hapus, 'sections/guru/hapus-guru.html', 400, 500) }        
    }]
}, {
    label: 'Mata Pelajaran',
    submenu: [{
        label: 'Tambahkan Mapel',
        click() { mainWindow(tambah, 'sections/mapel/hapus-mapel.html', 400, 500) }
    }, {
        label: 'Ubah Mapel',
        click() { mainWindow(ubah, 'sections/mapel/hapus-mapel.html', 400, 500) }
    }, {
        label: 'Hapus Mapel',
        click() { mainWindow(hapus, 'sections/mapel/hapus-mapel.html', 400, 500) }
    }]
}, {
    // Check if the platform is mac (darwin) or something else
    accelerator: config.close_app,
    click() {
        app.quit();
    }
}]


function mainWindow (win, f, w, h) {
    // create window
    win = new BrowserWindow({
        width: w,
        height: h
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
    let menuTemplate;
    menuTemplate = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(menuTemplate)

    win.on('closed', () => { 
        if (win === mainWin) {
            connection.end()
        }
        win = null;
     })
    win.show()
}

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
    mainWindow(mainWin, 'index.html')
})