var mysql = require('mysql');
var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config)

// Stolen from https://stackoverflow.com/questions/2276463/how-can-i-get-form-data-with-javascript-jquery
function setOrPush(target, val) {
    var result = val;
    if (target) {
        result = [target];
        result.push(val);
    }
    return result;
}

function getFormData(formElement) {
    var formElements = formElement.elements;
    var formParams = {};
    var i = 0;
    var elem = null;

    for (i = 0; i < formElements.length; i += 1) {
        elem = formElements[i];
        switch (elem.type) {
            case 'submit':
                break;
            case 'radio':
                if (elem.checked) {
                    formParams[elem.name] = elem.value
                }
                break;
            case 'checkbox':
                if (elem.checked) {
                    formParams[elem.name] = setOrPush(formParams[elem.name], elem.value);
                }
                break;
            default:
                formParams[elem.name] = setOrPush(formParams[elem.name], elem.value)
        }
    }

    return formParams;
}

document.getElementById('btn1').addEventListener('click', function (e) {
    e.preventDefault();
    let params = getFormData(document.getElementById('tambah-siswa'));
    let data = JSON.stringify(params, null, ' ');
    document.getElementById('result').innerHTML = data;
    console.log(JSON.parse(data))
    connection.query("INSERT INTO tabel_siswa SET ? ", JSON.parse(data), function (err, result, fields) {
        if (err) throw Error;

        console.log(result.affectedRows)
    })
})