"use strict";

var electron = require('electron');
var {BrowserWindow, Menu} = electron.remote
// Built-in module
var join = require('path').join;
var url  = require('url');

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
        Window's width
     * @param {Number} h
        Window's height
     * @param {Array} m
        It will create top-bar menu.
     * @example 
     *  Var menu = [{
     *  label: 'menu',
     *   submenu: [{
     *     label: 'I\'m Sub Menu'
     *   }]
     * }]
     */
    showWindow: (win, f, w, h, m) => {
        // Window's setting
        win = new BrowserWindow({
            width: w,
            height: h
        });
        // look up for the file's location
        var file = join(__dirname, '../', f);

        // Top menu for the application
        var topMenu = Menu.buildFromTemplate(m)
        if (m !== undefined && m.length > 0) {
            Menu.setApplicationMenu(topMenu)
        }

        // Another window's setting
        win.on('close', () => { win = null; });
        win.loadURL(url.format({
            pathname: file,
            protocol: 'file',
            slashes: true
        }));
        win.show();
    }
}