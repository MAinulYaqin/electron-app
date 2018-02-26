var mysql = require('mysql');
var md5 = require('md5');
var {join} = require('path');

var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config)

var form = document.getElementById('login')

function setOrPush(target, val) {
    var result = val;
    if (target) {
        result = [target];
        result.push(val);
    }
    return result;
}
// Get form data
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
            case 'password':
                formParams[elem.name] = setOrPush(formParams[elem.name], md5(elem.value));
                break;
            case 'radio':
                if (elem.checked) {
                    formParams[elem.name] = elem.value;
                }
                break;
            case 'checkbox':
                if (elem.checked) {
                    formParams[elem.name] = setOrPush(formParams[elem.name], elem.value);
                }
                break;
            default:
                formParams[elem.name] = setOrPush(formParams[elem.name], elem.value);
                break;
        }
    }

    return formParams;
}

document.getElementById('btn1').addEventListener('click', function (e) {
    e.preventDefault();

    let data = getFormData(form);
    connection.query(`SELECT id FROM master_admin WHERE username=${JSON.stringify(data.username)} and password=${JSON.stringify(data.password)}`, function (err, result, fields) {
        if (err) throw new Error

        console.log(result)
        document.location.href = join(__dirname, '../index.html');
    })
})