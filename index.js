var electron, { app, ipcMain } = require('electron');
var { showWindow, addTopBar } = require('./controllers/window');
var config = require('./assets/config');

// Empty variable for windows
var mainWin, tambah, ubah, hapus;
var mainMenuTemplate = [{
    label: 'File',
    submenu: [{
        label: 'Exit',
        click() {
            app.quit();
        }
    }]
}, {
    label: 'Siswa',
    submenu: [{
        label: 'Tambahkan Siswa',
        click() {
            showWindow(tambah, 'sections/siswa/create-siswa.html', 480, 560)
        }
    }, {
        label: 'Ubah Data Siswa',
        click() {
            showWindow(ubah, 'sections/siswa/update-siswa.html', 480, 560)
        }
    }, {
        label: 'Hapus Siswa',
        click() {
            showWindow(hapus, 'sections/siswa/delete-siswa.html', 480, 560)
        }
    }]
}, {
    label: 'Guru',
    submenu: [{
        label: 'Tambahkan Guru',
        click() {
            showWindow(tambah, 'sections/guru/create-guru.html', 480, 560)
        }
    }, {
        label: 'Ubah Data Guru',
        click() {
            showWindow(ubah, 'sections/guru/update-guru.html', 480, 560)
        }
    }, {
        label: 'Hapus Data Guru',
        click() {
            showWindow(hapus, 'sections/guru/delete-guru.html', 480, 560)
        }
    }]
}, {
    label: 'Mata Pelajaran',
    submenu: [{
        label: 'Tambahkan Mapel',
        click() {
            showWindow(tambah, 'sections/mapel/create-mapel.html', 480, 560)
        }
    }, {
        label: 'Ubah Mapel',
        click() {
            showWindow(ubah, 'sections/mapel/update-mapel.html', 480, 560)
        }
    }, {
        label: 'Hapus Mapel',
        click() {
            showWindow(hapus, 'sections/mapel/delete-mapel.html', 480, 560)
        }
    }]
}, {
    // Check if the platform is mac (darwin) or something else
    accelerator: config.close_app,
    click() {
        app.quit();
    }
}]

var argument;
ipcMain.on('return-value', function (e, arg) {
    argument = arg
})

ipcMain.on('pesan', function (e, arg) {
    console.log(arg) // will return ping
    e.sender.send('reply-pesan', argument)
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

app.on('ready', () => {
    showWindow(mainWin, 'sections/login/login.html', 800, 600, 800, 600)
    addTopBar(mainMenuTemplate)
})