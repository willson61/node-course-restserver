const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/user',
            uploads: '/api/uploads'
        }
        this.usersRoutePath = '/api/users';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );

        // File Upload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){
        
        this.app.use( this.paths.usuarios , require('../routes/user'));
        this.app.use( this.paths.auth , require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.productos , require('../routes/productos'));
        this.app.use( this.paths.categorias , require('../routes/categorias'));
        this.app.use( this.paths.uploads , require('../routes/uploads'));

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        });
    }

}

module.exports = Server;