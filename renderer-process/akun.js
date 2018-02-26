var {insert} = require('../controllers/insert');
var md5 = require('md5');

document.getElementById('btn1').addEventListener('click', function (e) {
    e.preventDefault();
    insert('tambah-akun', 'master_admin')
})