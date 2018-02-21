var mysql = require('mysql');
var config = require('../assets/config');
var connection = mysql.createConnection(config.mysql_config);

// Stolen from https://stackoverflow.com/questions/2276463/how-can-i-get-form-data-with-javascript-jquery
function setOrPush (target, val) {
    var result = val;
    if (target) {
        result = [target];
        result.push(val);
    }
    return result;
}
// Get form data
function getFormData (formElement) {
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

module.exports = {
    /**
     * @param {String} f
        form's id
     * @param {String} g
        table's name
     */
    insert : function (f, g) {
        // Get form's id
        let params = getFormData(document.getElementById(f));
        // Change data to string and display it
        let data = JSON.stringify(params, null, '');
        document.getElementById('result').innerHTML = data;
        // Check the data | development
        console.log(JSON.parse(data))
        
        // Insert into database (query), then parsing the data back to JSON
        // after it, check affected rows with console.log
        connection.query(`INSERT INTO ${g} SET ?`, JSON.parse(data), function (err, result, fields) {
            if (err) throw Error;

            console.log(result.affectedRows);
        });
    }
}