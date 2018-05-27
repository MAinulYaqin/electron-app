// @ts-check


// This controller i create for *.js inside /public/javascripts
var electron = require('electron');
var { BrowserWindow, Menu } = electron.remote || electron
// Built-in module
var join = require('path').join;
var url = require('url');

var mysql = require('mysql')
var config = require('../assets/config');
var conn = mysql.createConnection(config.mysql_config)

conn.connect();

var mainWin;
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
    showWindow: function (win, f, w, h, minW, minH) {
        // create window
        win = new BrowserWindow({
            width: w,
            height: h,
            minWidth: minW,
            minHeight: minH,
        })

        // Look up for the file's pathname
        let file = join(__dirname, '../' ,f)
        // Another setting for window
        win.loadURL(url.format({
            pathname: file,
            protocol: 'file',
            slashes: true
        }))

        win.on('close', () => {
            if (win === mainWin) {
                conn.end()
                console.log(true)
            }
            setTimeout(() => {
                win == null;
            }, 2000);
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
    },
    singleData : (win, f, w, h, minW, minH) => {
         // create window
         win = new BrowserWindow({
            width: w,
            height: h,
            minWidth: minW,
            minHeight: minH,
        })

        // Look up for the file's pathname
        let file = join(__dirname, '../' ,f)
        // Another setting for window
        win.loadURL(url.format({
            pathname: file,
            protocol: 'file',
            slashes: true
        }))

        win.on('close', () => {
            win == null;
        })
        win.show()
    }
}