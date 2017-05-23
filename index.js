const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3003
const app = express()
const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
const io = socketIO(server)

app.use(bodyParser.json())


app.get('/', (request, response) => {
    response.json({test: 'API is up.'})
})

app.post('/noice', (request, response) => {

    const challenge = request.body.challenge // needed for slack integration
    const matchPatterns = /(noice|nice|chris|vscode|node|vue|javascript|raspberry)/i

    if (request.body.hasOwnProperty('event') && request.body.event.type === 'message') {

        const messageText = request.body.event.text

        if (typeof messageText !== 'undefined' && messageText.match(matchPatterns)) {
            console.log('match found!')
            console.log(`Emitting socket.io event at: ${new Date}`)

            io.emit('noice')
        }
    }

    response.json({challenge, hi: 'hey!'})
})

function hub(socket){
    console.log('user connected')

    // socket.on('login', (request, ...args) => {
    //     console.log('new client logged in')
    //     socket.emit('response', "you're logged in", "welcome!")
    // })

    socket.on('fire-activation', (payload) => {
        console.log('received activation from client')
        console.log(`activation payload: ${JSON.stringify(payload)}`)

        socket.on('fire-pattern-complete', payload => {
            console.log('pattern complete')
            socket.emit('activation-complete')
        })

        // if (payload.hasOwnProperty('type')) {
            socket.broadcast.emit('fire-pattern', payload)
        // }

    })

    socket.on('disconnect', () => console.log('client disconnected'))
}

io.on('connection', hub)

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))