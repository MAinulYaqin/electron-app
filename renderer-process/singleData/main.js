let mysql = require('mysql')
let config = require('../../assets/config')
let conn = mysql.createConnection(config.mysql_config)

conn.connect()

function hapus (e, f) {
    let a = document.getElementById(`hapus-${e}`)
    let g = document.querySelectorAll('[data=Nama]')

    a.addEventListener('click', (e) => {
        e.preventDefault()

        console.log(g)
        conn.query(`DELETE FROM ${f} WHERE Nama=?`, g[0].textContent.replace("Nama", '').replace(':', '').split(' ').slice(2).join(' '), (er, result) => {
            if (er) throw Error

            console.log(result)
        })
    })
}

hapus('guru', 'tabel_guru')
hapus('siswa', 'tabel_siswa')
hapus('tendik', 'tabel_tendik')