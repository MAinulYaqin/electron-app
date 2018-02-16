"use strict";

var electron = require('electron');
var browserWindow = electron.BrowserWindow;
// Built-in module
var join = require('path').join;
var url  = require('url');

var win;

module.exports = {
    /**
     * @param {String} f
     * @param {Number} w
     * @param {Number} h
     * @description 
     *     + f for file's name and location
     *     + w for window's width
     *     + h for window's height
     */
    showWindow: (f, w, h) => {
        // file location
        var file = join(__dirname, '../', f);
        win = new browserWindow({
            width: w,
            height: h
        });
        
        win.on('close', () => { win = null; });
        win.loadURL(url.format({
            pathname: file,
            protocol: 'file',
            slashes: true
        }));
        win.show();
    }
}