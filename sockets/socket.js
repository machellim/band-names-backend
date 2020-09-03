const { io } = require('../index')

io.on('connection', client => {
  console.log('cliente conectado')
  client.on('disconnect', () => {
    console.log('cliente desconectado')
  })

  client.on('mensaje', (data) => {
    console.log(data)


    io.emit('mensaje', { mensaje: 'otro mensaje' })

  })

})