const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands= new Bands();


bands.addBand(new Band('Queen'));
bands.addBand(new Band('CNCO'));
bands.addBand(new Band('Travis Scott'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Bon Jovi2'));

console.log(bands);

//mensajes de Sockets
io.on("connection", (client) => {
    //cliente es un host que se acaba de conectar al socket server
    console.log("cliente conectado");
    client.emit('active-bands', bands.getBands());
    //client.on('event', data => { /* … */ });
    client.on("disconnect", () => {
        console.log("cliente desconectado");
    }); //dispara cuanto el host se desconecte
    /*La escucha debe ser literlamente el mismo/igual "mensaje de index.html" */
    client.on("mensaje", (payload) => {
        //payload para cargar el mensaje Altair
        console.log("Mensaje!!!", payload);

        io.emit("mensaje", { admin: "Nuevo mensaje" }); //manda mensaje a todos los clientes conectados
    });

    /*client.on("emitir-mensaje", (payload) => {
        //io.emit('nuevo-mensaje',payload);//io.emit emite a todos
        client.broadcast.emit("nuevo-mensaje", payload); //a todos menos a quien lo emite
        
    });*/
    client.on("add-band",function(payload){
        console.log(payload)
        bands.addBand(new Band(payload.name));
        io.emit('active-bands',bands.getBands());

    });

    client.on("vote-band", (payload) => {
        bands.voteBand(payload.id);
        /*io es el servidor que manda a todos incluso al mismo
        que emite */
        io.emit('active-bands',bands.getBands());
    });

    client.on('delete-band',(payload)=>{
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });
});
