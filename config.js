var env = process.env
var platform = process.platform
module.exports = {
    NODE_ENV : env.NODE_ENV == 'development',
    close_app : platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
    toggle_devTools : platform == 'darwin' ? 'Command+Shift+I' : 'Ctrl+Shift+I'
}