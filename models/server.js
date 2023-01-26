// Servidor de express
const express   = require('express');
const http      = require('http');
const socketio  = require ( "socket.io" );
const path      = require('path');
const Sockets   = require('./sockets');


class Server {

    constructor() {
        this.app  =  express();
        this.port =  process.env.PORT;

        // http server
        this.server = http.createServer( this.app );

        // Configuración del socket server 

        this.io = socketio(this.server, { /** configuraciones */});

    }

    middlewares() {
        //Desplegar el directorio público
        this.app.use ( express.static( path.resolve (__dirname , '../public')));      
    }

    sockectsConfig() {
        new Sockets ( this.io );


    }

    execute () {
        // Init middleware
        this.middlewares();
        // Init sockets
        this.sockectsConfig();

        // Init server
        this.server.listen(this.port , () => {
            console.log('listening on *:',this.port);
          });
    }

}

module.exports = Server; 