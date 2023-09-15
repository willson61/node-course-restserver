const { response } = require("express");

const validarArchivoSubir = ( req, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg:'No files were uploaded. - validarArchivoSubir'});
    }
    next();
}

module.exports = {
    validarArchivoSubir
}