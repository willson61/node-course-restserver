const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole } = require('../middlewares');
const { crearProducto, obtenerProductos, obtenerProducto, eliminarProducto, actualizarProducto } = require('../controllers/productos');
const { existeProductoID, existeCategoriaID } = require('../helpers/db-validators');

const router = Router();

// {{url}}/api/categories

// Obtener todas la productos - publico
router.get('/', [
    check('limite', 'El limite debe de ser un numero').optional().isNumeric(),
    check('desde', 'El desde debe de ser un numero').optional().isNumeric(),
    validarCampos
], obtenerProductos);

// Obtener una producto por id - publico
router.get('/:id', [
    check('id').custom( existeProductoID ),
    validarCampos
], obtenerProducto);

// Crear producto - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'La categoria es obligatoria').notEmpty(),
    check('categoria').custom( existeCategoriaID ),
    validarCampos
], crearProducto)

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('id').custom( existeProductoID ),
    check('categoria').optional().custom( existeCategoriaID ),
    validarCampos
], actualizarProducto)

// Borrar una producto - Admin
router.delete('/:id', [
    validarJWT,
    validarAdminRole,
    check('id').custom( existeProductoID ),
    validarCampos
], eliminarProducto)

module.exports = router;