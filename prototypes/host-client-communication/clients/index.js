const io = require('socket.io-client')

console.log('connecting')
const socket = io.connect('http://localhost:3002')

socket.on('connect', () => {
    console.log('connected')

    socket.emit('login', 'log me in plz', 'pretty plz', 'another argument')

    socket.on('response', (...args) => {
        console.log(args)
    })
})

// update and fire
