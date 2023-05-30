const ObjectId = require('mongoose').Types.ObjectId;
const Role = require('../models/role');
const User = require('../models/user');

const isValidObjectId = (id) => {
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la DB`);
    }
}

const emailExiste = async( correo = '' ) => {
    const emailExists = await User.findOne({ correo });
    if(emailExists){
        throw new Error(`El correo ${ correo } ya esta registrado en la DB`);
    }
}

const existeUsuarioID = async( id = '' ) => {
    if(!isValidObjectId(id)){
        throw new Error(`This isn't a valid Mongoose ID`);
    }
    const existeUsuario = await User.findById(id);
    if(!existeUsuario){
        throw new Error(`The user with ID '${ id }' doesn't exist`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioID
}