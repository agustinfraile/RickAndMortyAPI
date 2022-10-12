const express = require('express');
const morgan = require('morgan');
const auth = require('./utils.js');
const characters = require('./characters');
const server = express();
const PORT = 3000;

server.use(express.json())
server.use(morgan("dev"))
server.use(auth)

server.use("/character", characters)

server.get("/", (req, res) => {
    res.send("Bienvenidos a nuetra API")
})

.listen(PORT, console.log(`Puerto escuchando en el puerto ${PORT}`))
