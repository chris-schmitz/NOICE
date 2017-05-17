const io = require('socket.io-client')
const {exec} = require('child_process')

console.log('connecting')
const socket = io.connect('https://stormy-sierra-95940.herokuapp.com/')

function firePattern (type) {
    // a bit goofey at the moment, but this is a way I can get a poc without
    // having to refactor the pattern prototype.
    const command = 'node ../../noice-patterns/index.js'
    exec(command, (error, stdout, stderr) => {
        console.log({error, stdout, stderr})
    })
}

socket.on('connect', () => {
    console.log('connected')

    socket.emit('login', 'log me in plz', 'pretty plz', 'another argument')

    socket.on('response', (...args) => {
        console.log(args)
    })
})

socket.on('connect_error', error => console.error(error))

// update and fire
