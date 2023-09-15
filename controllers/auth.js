const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        
        // Verificar si el email existe
        const usuario = await User.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }

        // Verificar si el usuario esta activo
        if( !usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await User.findOne({ correo });

        if( !usuario ){
            const data = {
                nombre,
                correo,
                password: ':)',
                img,
                google: true
            };
            usuario = new User( data );
            await usuario.save();
        }

        // Si el usuario existe en DB
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar Token
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'ok',
            token,
            usuario
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar',
            error
        })
    }

}

module.exports = {
    login,
    googleSignIn
}