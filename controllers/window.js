"use strict";

var electron = require('electron');
var browserWindow = electron.BrowserWindow;
// Built-in module
var join = require('path').join;
var url  = require('url');

var win;

module.exports = {
    showWindow: (e) => {
        // file location
        var file = join(__dirname, '../', e );
        win = new browserWindow();
        
        win.on('close', () => { win = null; });
        win.loadURL(url.format({
            pathname: file,
            protocol: 'file',
            slashes: true
        }));
        win.show();
    }
}