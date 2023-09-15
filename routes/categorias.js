const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, eliminarCategoria, actualizarCategoria } = require('../controllers/categorias');
const { existeCategoriaID } = require('../helpers/db-validators');

const router = Router();

// {{url}}/api/categories

// Obtener todas la categorias - publico
router.get('/', [
    check('limite', 'El limite debe de ser un numero').optional().isNumeric(),
    check('desde', 'El desde debe de ser un numero').optional().isNumeric(),
    validarCampos
], obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id').custom( existeCategoriaID ),
    validarCampos
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria)

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom( existeCategoriaID ),
    validarCampos
], actualizarCategoria)

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    validarAdminRole,
    check('id').custom( existeCategoriaID ),
    validarCampos
], eliminarCategoria)

module.exports = router;