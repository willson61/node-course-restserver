const ObjectId = require('mongoose').Types.ObjectId;
const { Categoria, Role, Usuario, Producto } = require('../models');

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
    const emailExists = await Usuario.findOne({ correo });
    if(emailExists){
        throw new Error(`El correo ${ correo } ya esta registrado en la DB`);
    }
}

const existeUsuarioID = async( id = '' ) => {
    if(!isValidObjectId(id)){
        throw new Error(`This isn't a valid Mongoose ID`);
    }
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`The user with ID '${ id }' doesn't exist`);
    }
}

const existeCategoriaID = async( id = '' ) => {
    if(!isValidObjectId(id)){
        throw new Error(`This isn't a valid Mongoose ID`);
    }
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`The category with ID '${ id }' doesn't exist`);
    }
}

const existeProductoID = async( id = '' ) => {
    if(!isValidObjectId(id)){
        throw new Error(`This isn't a valid Mongoose ID`);
    }
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`The product with ID '${ id }' doesn't exist`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida`);
    }
    return true;
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioID,
    existeCategoriaID,
    existeProductoID,
    coleccionesPermitidas
}