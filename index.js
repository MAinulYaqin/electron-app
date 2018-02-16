var electron = require('electron');
var app = electron.app;
// built-in module
var windowController = require('./controllers/window');

var index = () => { windowController.showWindow('index.html') }

app.on('ready', index)