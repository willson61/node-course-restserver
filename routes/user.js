const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, validarAdminRole, hasRole } = require('../middlewares');
const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/user');
const { esRolValido, emailExiste, existeUsuarioID } = require('../helpers/db-validators');

const router = Router();

router.get('/', [
    check('limite', 'El limite debe de ser un numero').optional().isNumeric(),
    check('desde', 'El desde debe de ser un numero').optional().isNumeric(),
    validarCampos
], usersGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña debe de tener mas de 6 letras').isLength({ min: 6 }),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE ']),
    check('rol').custom( esRolValido ),
    check('correo').custom( emailExiste ),
    validarCampos
], usersPost);

router.put('/:id', [
    check('id').custom( existeUsuarioID ),
    check('rol').custom( esRolValido ),
    validarCampos
], usersPut);

router.patch('/', usersPatch);

router.delete('/:id', [
    validarJWT,
    validarAdminRole,
    check('id').custom( existeUsuarioID ),
    validarCampos
], usersDelete);

module.exports = router;