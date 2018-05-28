let electron, { app, ipcMain } = require('electron');
let { showWindow, addTopBar } = require('./controllers/window');
let config = require('./assets/config');

// Empty variable for windows
let mainWin, tambah, ubah, hapus;
let mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Exit',
        click() {
            app.quit();
        }
    }]
}, {
    label: 'Guru',
    submenu: [{
        label: 'Tambahkan Guru',
        click() {
            showWindow(tambah, 'sections/guru/create-guru.html')
        }
    }]
}, {
    label: 'Siswa',
    submenu: [{
        label: 'Tambahkan Siswa',
        click() {
            showWindow(tambah, 'sections/siswa/create-siswa.html')
        }
    }]
}, {
    label: 'Tendik',
    submenu: [{
        label: 'Tambahkan Tendik',
        click() {
            showWindow(tambah, 'sections/tendik/create-tendik.html')
        }
    }]
}, {
    // Check if the platform is mac (darwin) or something else
    accelerator: config.close_app,
    click() {
        app.quit();
    }
}]

let usrname = ''
// Get the data/username
ipcMain.on('username', function (e, data) {
    usrname = data
})
// send it to another channel
ipcMain.on('usrname', (e, data) => {
    e.sender.send('usrname-render', usrname)
})

ipcMain.on('return-value', function (e, data) {
    ipcMain.on('pesan', function (e, arg) {
        e.sender.send('reply-pesan', data)
    })
})

ipcMain.on('tendik', function (e, data) {
    ipcMain.on('data-tendik', function (e, arg) {
        e.sender.send('return-tendik', data)
    })
})

ipcMain.on('siswa', function (e, data) {
    ipcMain.on('data-siswa', function (e, arg) {
        e.sender.send('return-siswa', data)
    })
})

// Another configuration for mac
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}
// configuration for development environment
if (config.node_env == 'development') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [{
            label: 'Toggle Developer Tools',
            accelerator: config.toggle_devTools,
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        }, {
            label: 'Tambah akun',
            click() {
                showWindow(tambah, 'sections/akun/create-akun.html', 480, 350)
            }
        }, {
            label: 'Reload',
            role: 'reload'
        }]
    })
} else {
    mainMenuTemplate.pop()
}

console.log('this is awesome app :D');

app.on('ready', () => {
    showWindow(mainWin, 'sections/login/login.html', 1250, 666, 800, 600)
    addTopBar(mainMenuTemplate)
})
