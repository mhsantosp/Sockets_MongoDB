const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.set('port', 4500);
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

app.use('/api', require('./routes/chats'));

// para conectar index en la carpeta oublic con la parte de back
const path = require("path");

//Concatenar donde tenemos la carpeta public
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), () => {
  console.log("en puerto", app.get("port"));
});

//Websockets

//Traemos libreria
const SocketIO = require("socket.io");
const io = SocketIO(server);

//Establecemos la conexion
io.on("connection", (socket) => {
  console.log("Se ha conectado alguien", socket.id);
  socket.on('chat:message', (data) => {
    console.log(data);
    io.sockets.emit('chat:message', data)
  })
});