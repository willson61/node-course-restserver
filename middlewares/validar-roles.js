
const validarAdminRole = (req, res, next) => {
    if(!req.authUser){
        return res.status(500).json({
            msg: 'No se ha verificado el token'
        });
    }
    const { rol, nombre } = req.authUser;
    if( rol !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }
    next();
}

const hasRole = ( ...roles ) => {
    return (req, res = response, next) => {

        if(!req.authUser){
            return res.status(500).json({
                msg: 'No se ha verificado el token'
            });
        }
        const { rol, nombre } = req.authUser;
        if( !roles.includes(rol) ){
            return res.status(401).json({
                msg: `${nombre} no tiene uno de estos roles ${ roles }`
            })
        }

        next();
    }
}

module.exports = {
    validarAdminRole,
    hasRole
}