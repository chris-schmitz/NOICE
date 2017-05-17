const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const PORT = 3002

app.get('/', (request, response) => {
    response.send('worked')
})

io.on('connection', (socket, ...args) => {
    console.log('user connected')

    socket.on('login', (request, ...args) => {
        console.log('logged in')
        console.log(`request: ${request}`)
        console.log(`args: ${args}`)
        socket.emit('response', "you're logged in", "welcome!")
    })
})

http.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})