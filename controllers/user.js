const { response, request } = require('express');

const usersGet = (req = request, res = response) => {

    const params = req.query;

    res.json({
        ok: true,
        msg: 'get API - controlador',
        params
    });
};

const usersPost = (req = request, res = response) => {

    const body = req.body;

    res.json({
        ok: true,
        msg: 'post API - controlador',
        body
    });
};

const usersPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'put API - controlador',
        id
    });
};

const usersPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
};

const usersDelete = (req, res = response) => {
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