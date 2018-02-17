"use strict";
// This controller i create for *.js inside /public/javascripts
var electron = require('electron');
var {BrowserWindow} = electron.remote
var {Menu} = electron;
// Built-in module
var join = require('path').join;
var url  = require('url');

function required () {
    if (this.target.length <= 0) {
        throw new Error('This parameter is required')
    }
}

module.exports = {
    /**
     * @param {Variable} win
        Empty variable.
        You must declared empty variable to create new window.
        Simply like one empty variable is equal to one new window.
     * @param {String} f
        File's name.
         + it must be on the root level
     * @param {Number} w
        Window's width :: not required ::
     * @param {Number} h
        Window's height :: not required ::
     * @param {Number} maxW
        Max width of the window :: not required ::
     * @param {Number} maxH
        max Height of the window :: not required ::
     * @param {Array} menus
        Create menus on top bar of the application :: not required ::
     */
    showWindow: (win, f, w, h, maxW, maxH, menus) => {
        // create window
        win = new BrowserWindow({
            width: w,
            height: h,
            maxWidth: maxW,
            maxHeight: maxH
        })
        // Look up for the file's pathname
        let file = join(__dirname, '../' + f)
        // Another setting for window
        win.loadURL(url.format({
            pathname: file,
            protocol: 'file',
            slashes: true
        }))
        // Set application's menus
        let menuTemplate;
        if (menus == undefined || menus.length < 0 || menus == null) {
            return
        } else {
            menuTemplate = Menu.buildFromTemplate(menus)
            Menu.setApplicationMenu(menuTemplate)
        }
        // Show & close the app
        win.on('close', () => { win = null })
        win.show()
    }
}