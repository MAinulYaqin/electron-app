var container = document.getElementById('container')
var loader = document.getElementById('circle-loader')

setTimeout(function() {
    loader.style.display = 'none';
    container.style.visibility = 'visible'
}, 2000);