// @ts-check
var md5 = require('md5');

// Stolen from https://stackoverflow.com/questions/2276463/how-can-i-get-form-data-with-javascript-jquery

module.exports = {
    getFormData : function (formElement) {
        var formElements = formElement.elements;
        var formParams = {};
        var elem;
    
        for (let i = 0; i < formElements.length; i++) {
            elem = formElements[i];
            switch (elem.type) {
                case 'submit':
                    break;
                case 'password':
                    formParams[elem.name] = md5(elem.value);
                    break;
                default:
                    formParams[elem.name] = elem.value;
                    break;
            }
        }
    
        return formParams;
    },
    clearData : function (formElements) {
        let f = formElements.elements
        for (let i of f) {
            switch (i.type) {
                default:
                    i.value = ''
                    break;
            }
        }
    }
}