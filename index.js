const express = require('express')
server = express()
const http = require('http').Server(server)
const io = require('socket.io')(http)

PORT = process.env.PORT

server.get('/', (request, response) => {
    response.json({test: 'worked'})
})

function hub(socket){
    console.log('user connected')
    console.log('user connected')

    socket.on('login', (request, ...args) => {
        console.log('logged in')
        console.log(`request: ${request}`)
        console.log(`args: ${args}`)
        socket.emit('response', "you're logged in", "welcome!")
    })
}

io.on('connection', hub)

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))