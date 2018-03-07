var {Login} = require('../controllers/login')

document.getElementById('btn1').addEventListener('click', function (e) {
    e.preventDefault()
    Login(document.getElementById('form-login'))
})