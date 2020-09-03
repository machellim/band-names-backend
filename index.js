const e = require('express')
const express = require('express')
const { resolve } = require('path')
const app = express()
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT || 3000



//Node Server
const server = require('http').createServer(app)
module.exports.io = require('socket.io')(server)
require('./sockets/socket')



const publicPath = path.resolve(__dirname, 'public')

app.use(express.static(publicPath))


server.listen(PORT, (err) => {

  if(err) throw new Error(err)

  console.log(`Servidor corriendo en el puerto`, PORT)

})