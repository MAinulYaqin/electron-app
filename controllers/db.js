let mysql = require('mysql')
let config = require('../assets/config')
let md5 = require('md5')
let electron = require('electron')
let {ipcRenderer} = electron
let {singleData} = require('./window')
let conn = mysql.createConnection(config.mysql_config)
let {getFormData, clearData} = require('../assets/getFormData')

module.exports = {
    showAll: function (f, win, channel, path) {
        Array.prototype.forEach.call(f, (e) => {
            e.addEventListener('click', () => {
                ipcRenderer.send(`${channel}`, e.children[1].textContent)
                console.log(channel)
                console.log(path)
                singleData(win, `./sections/singleData/data-${path}.html`)
            })
        })
    },
    /**
     * @param {String} t
     * {String} Table's name
     * @param {String} f
     * {String} data. username to search on database
     * @param {Array} d
     *  {Array} doc.getElementsByClassName.
     *  the dom should have attributes data
     */
    single: function (t, f, d) {
        let id;
        conn.query(`SELECT * FROM ${t} WHERE Nama=${JSON.stringify(f)}`, (err, result) => {
            if (err) throw Error

            let data = [];
            Array.prototype.forEach.call(result, (e) => {
                data.push(e)
            })
            // replacing names that have _ underscores like alamat_rumah
            Array.prototype.forEach.call(d, (e) => {
                e.innerHTML = `${e.getAttribute('data').replace('_', ' ')} : ${data[0][e.getAttribute('data')]}`
            })
            // change the value 
            // if L to be Laki-laki
            // if P gonna be Perempuan
            d[1].textContent === 'JK : L' ? d[1].textContent = 'Jenis Kelamin : Laki-laki' : d[1].textContent = 'Jenis Kelamin : Perempuan'
        })
    },
    /**
     * @param {String} f
        form's id
     * @param {String} g
        table's name
     */
    insert: function (f, g) {
        // Get form's id
        let params = getFormData(document.getElementById(f));
        // Change data to string and display it
        // let data = JSON.stringify(params, null, '');
        let lul = {}
        // Insert into database (query), then parsing the data back to JSON
        // after it, check affected rows with console.log
        Object.assign(lul, params)
        console.log(lul)
        conn.query(`INSERT INTO ${g} SET ?`, lul, function (err, result) {
            if (err) throw Error;

            console.log(result.affectedRows);
            clearData(document.getElementById(f))
            lul = {}
        });
    },
    /**
     * @param {String} e
        button's id
     * @param {String} f
        table's name
     */
    deleteData: function (e, f) {
        let a = document.getElementById(`hapus-${e}`)
        let g = document.querySelectorAll('[data=Nama]')

        a.addEventListener('click', (e) => {
            e.preventDefault()

            console.log(g)
            conn.query(`DELETE FROM ${f} WHERE Nama=?`, g[0].textContent.replace("Nama", '').replace(':', '').split(' ').slice(2).join(' '), (err, result) => {
                if (err) console.log(err)

                console.log(result)
            })
        })
    }
}