var {insert} = require('../controllers/insert');

document.getElementById('btn1').addEventListener('click', function (e) {
    e.preventDefault()
    insert('tambah-mapel', 'tabel_mapel')
})