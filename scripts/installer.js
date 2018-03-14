"use strict";

var electronInstaller = require('electron-winstaller');

// In this case, we can use relative paths
var settings = {
    // Specify the folder where the built app is located
    appDirectory: '../../release-builds/smekda-pro-win32-ia32',
    // Specify the existing folder where 
    outputDirectory: '../../release-builds/smekda-pro-win32-ia32-installer',
    // The name of the Author of the app (the name of your company)
    authors: 'AinulBedjo',
    // The name of the executable of your built
    exe: '../../release-builds/smekdApp.exe'
};

var resultPromise = electronInstaller.createWindowsInstaller(settings);

resultPromise.then(() => {
    console.log("The installers of your application were succesfully created !");
}, (e) => {
    console.log(`Well, sometimes you are not so lucky: ${e.message}`)
});