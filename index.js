const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')


PORT = process.env.PORT || 3003

const app = express()
app.use(bodyParser.json())

const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
const io = socketIO(server)


app.get('/', (request, response) => {
    response.json({test: 'worked'})
})

app.post('/noice', (request, response) => {
    console.log(request.body)
    const challenge = request.body.challenge

    io.emit('noice')

    response.json({challenge, hi: 'hey!'})
})

function hub(socket){
    console.log('user connected')

    socket.on('login', (request, ...args) => {
        console.log('logged in')
        socket.emit('response', "you're logged in", "welcome!")
    })
    socket.on('disconnect', () => console.log('client disconnected'))
}

io.on('connection', hub)

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))