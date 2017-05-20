const io = require('socket.io-client')
const {exec} = require('child_process')
const path = require('path')

console.log('starting up')
const socket = io.connect('https://stormy-sierra-95940.herokuapp.com/')

function firePattern () {
    // a bit goofey at the moment, but this is a way I can get a poc without
    // having to refactor the pattern prototype.
    const patternPath = path.resolve('./noice-patterns/index.js')
    const command = `node ${patternPath}`

    exec(command, (error, stdout, stderr) => {
        console.log(`pattern fire complete at: ${new Date}`)
    })
}

socket.on('connect', () => {
    console.log('connected')

    socket.emit('login', 'log me in plz', 'pretty plz', 'another argument')

    socket.on('response', (...args) => {
        console.log(args)
    })

    socket.on('noice', (...args) => {
        firePattern()
    })
})

socket.on('connect_error', error => console.error(error))
