// @ts-check

// This controller i create for *.js inside /public/javascripts
var electron = require('electron');
var { BrowserWindow, Menu } = electron.remote || electron
// Built-in module
var join = require('path').join;
var url = require('url');

function required() {
    throw new Error('This parameter is required')
}

var window = new BrowserWindow({
    width: 480,
    height: 560,
    maxWidth: 480,
    maxHeight: 560,
    minWidth: 480,
    minHeight: 560 
})

module.exports = {
    /**
     * @param {any} win
        Empty variable.
        You must declared empty variable to create new window.
        Simply like one empty variable is equal to one new window.
     * @param {String} f
        File's name.
        it must be on the root level
     */
    showWindow: (win = window, f, menus) => {
        // create window
        // Look up for the file's pathname
        let file = join(__dirname, '../sections', f)
        // Another setting for window
        win.loadURL(url.format({
            pathname: file,
            protocol: 'file',
            slashes: true
        }))
        // Show & close the app
        win.on('close', () => {
            win = null
        })
        win.show()
    },
    /**
     * @param {Array} a
        Given array will be output topbar
     */
    addTopBar: function (a) {
        let menuTemplate;
        menuTemplate = Menu.buildFromTemplate(a)
        Menu.setApplicationMenu(menuTemplate)
    }
}