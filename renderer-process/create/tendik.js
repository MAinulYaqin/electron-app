let {insert} = require('../../controllers/db')

document.getElementById('btn1').addEventListener('click', (e) => {
    e.preventDefault()
    insert('tambah-tendik', 'tabel_tendik')
})