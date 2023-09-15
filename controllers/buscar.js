const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = [
    'users',
    'roles',
    'productos',
    'categorias'
];

const buscarUsuarios = async( termino = '', res = response ) => {
    
    if(isValidObjectId(termino)){
        const usuario = await  Usuario.findById(termino);
        res.json({
            results: (usuario) ? [ usuario ] : []
        });
    }

    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuarios
    });

}

const buscarCategorias = async( termino = '', res = response ) => {
    
    if(isValidObjectId(termino)){
        const categoria = await  Categoria.findById(termino);
        res.json({
            results: (categoria) ? [ categoria ] : []
        });
    }

    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({
        $and: [{ nombre: regex }, { estado: true }]
    });

    res.json({
        results: categorias
    });

}

const buscarProductos = async( termino = '', res = response ) => {
    
    if(isValidObjectId(termino)){
        const producto = await  Producto.findById(termino).populate('categoria', 'nombre');
        res.json({
            results: (producto) ? [ producto ] : []
        });
    }
    
    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find({
        $and: [{ nombre: regex }, { estado: true }]
    }).populate('categoria', 'nombre');

    res.json({
        results: productos
    });

}

const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes(coleccion) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'users':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;
        default:
            res.status(500).json({
                msg: 'Aun no se ha hecho esta busqueda'
            })
    }
}

module.exports = {
    buscar
}