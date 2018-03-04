var {insert} = require('../controllers/db');

document.getElementById('btn1').addEventListener('click', function (e) {
    e.preventDefault();
    insert('tambah-guru', 'tabel_guru')
})