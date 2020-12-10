const express= require('express');

const path=require('path');
const { Socket } = require('socket.io');
/*Leerá el archivo .env y establecerá las variables de entorno que es lo que
yo necesito*/
require('dotenv').config();
//App de express
const app=express();//las app de express son compatibles con la creación de abajo

//creo servidor de sockets propio de node (Node server)--------------------------*
const server=require('http').createServer(app);//paquete por defecto en node, crear servidor
//exporto el io para el archivo sockets.js
module.exports.io =require('socket.io')(server);//mandamos de argumento el server que creamos
//fin crear servidor de sockets propio de node (Node server)---------------------*
require('./sockets/socket');


//Path público
/*Dir name apunta a donde sea que está el servidor
si ya está en producción https:// el nombre del dominio, etc */

const publicPath=path.resolve(__dirname, 'public');

//aquí le digo a la aplicación de express que cuando haga un cambio le sirva/muestre eso
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err);

    console.log('Servidor corriendo en puerto!', process.env.PORT);
});