// @ts-check
var md5 = require('md5');

// Stolen from https://stackoverflow.com/questions/2276463/how-can-i-get-form-data-with-javascript-jquery

module.exports = {
    getFormData: function (e) {
        let f = e.elements;
        let g = {};

        for (let i = 0; i < f.length; i++) {
            let h = f[i];
            switch (h.type) {
                case 'submit':
                    break;
                case 'button':
                    break;
                case 'password':
                    g[h.name] = md5(h.value);
                    break;

                default:
                    switch (h.name) {
                        case "RW":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "RT":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "kode_Pos":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "HP":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "NIK":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "NIK_Ayah":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "NIK_Ibu":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "NIK_Wali":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "NISN":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "NIPD":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "Telepon":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "No_UN":
                            g[h.name] = parseInt(h.value)
                            break;
                        case "Rekening":
                            g[h.name] = parseInt(h.value)
                            break;


                        case "JK":
                            g[h.name] = h.value === "Laki-laki" ? "L" : "P"
                            break;

                        case "Tanggal_lahir":
                            g[h.name] = h.value.split('/').join("-")
                            break;

                        default:
                            g[h.name] = h.value
                            break;
                    }
                    break;
            }
        }
        return g;
    },
    clearData: function (e) {
        let f = e.elements
        for (let i of f) {
            switch (i.type) {
                case 'text':
                    i.value = '';
                    break;
                case 'button' || 'submit':
                    break;
                default:
                    i.value = '';
                    break;
            }
        }
    }
}