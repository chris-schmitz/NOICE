const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

PORT = process.env.PORT || 3003

const app = express()
const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
const io = socketIO(server)


app.get('/', (request, response) => {
    response.json({test: 'worked'})
})

app.post('/client-action', (request, response) => {
    const payload = {type: 'noice'}
    io.emit('fire-action', payload)
})

function hub(socket){
    console.log('user connected')

    socket.on('login', (request, ...args) => {
        console.log('logged in')
        console.log(`request: ${request}`)
        console.log(`args: ${args}`)
        socket.emit('response', "you're logged in", "welcome!")
    })
    socket.on('disconnect', () => console.log('client disconnected'))
}

io.on('connection', hub)

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))