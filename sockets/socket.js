const { io } = require('../index')
const Band = require('../models/band')
const Bands = require('../models/bands')


const bands = new Bands()
bands.addBand(new Band('Queen'))
bands.addBand(new Band('Bon Jovi'))
bands.addBand(new Band('Heroes'))
bands.addBand(new Band('Metallica'))


io.on('connection', client => {
  console.log('cliente conectado')


  client.emit('active-bands', bands.getBands())

  client.on('disconnect', () => {
    console.log('cliente desconectado')
  })

  client.on('mensaje', (data) => {
    console.log(data)


    io.emit('mensaje', { mensaje: 'otro mensaje' })

  })

  client.on('emitir-mensaje', (data) => {
    client.broadcast.emit('nuevo-mensaje', data)
  })


  client.on('vote-band', function(data) {
    bands.voteBand(data.id)
    io.emit('active-bands', bands.getBands())
  })      

  client.on('add-band', function(data) {
    const band = new Band(data.name);
    bands.addBand(band)
    io.emit('active-bands', bands.getBands())
  })   
  
  client.on('delete-band', function(data) {    
    bands.deleteBand(data.id)
    io.emit('active-bands', bands.getBands())
  })  

})