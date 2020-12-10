const {io}=require('../index');
//mensajes de Sockets
io.on('connection', client => {//cliente es un host que se acaba de conectar al socket server
    console.log('cliente conectado');
   //client.on('event', data => { /* … */ });
   client.on('disconnect', () => {
       console.log('cliente desconectado');
   });//dispara cuanto el host se desconecte
   /*La escucha debe ser literlamente el mismo/igual "mensaje de index.html" */
   client.on('mensaje',(payload)=>{    //payload para cargar el mensaje Altair
       console.log('Mensaje!!!', payload);

       io.emit('mensaje',{admin: 'Nuevo mensaje'});//manda mensaje a todos los clientes conectados
   });
 });