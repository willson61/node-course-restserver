const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const usersGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        ok: true,
        msg: 'get API - controlador',
        usuarios,
        total
    });
};

const usersPost = async(req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new User( { nombre, correo, password, rol } );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    res.json({
        ok: true,
        msg: 'post API - controlador',
        usuario
    });
};

const usersPut = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...rest } = req.body;

    // TODO validar contra base de datos
    if(password){
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate(id, rest);

    res.json({
        ok: true,
        msg: 'put API - controlador',
        usuario
    });
};

const usersPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
};

const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    // Borrar fisicamente
    // const usuario = await User.findByIdAndDelete( id );

    const usuario = await User.findByIdAndUpdate( id, { estado: false });

    res.json({
        ok: true,
        msg: 'delete API - controlador'
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}