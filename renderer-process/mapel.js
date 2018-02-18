var mysql = require('mysql');
var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config)