"use strict";

var exec = require('child_process').exec;
var config = require('../assets/config');

exec(`mysql -u ${config.mysql_config.user} -p${config.mysql_config.password} try < ./migrate/init.sql`, function (err, data) {
    if (err) throw Error;

    console.log(data)
})