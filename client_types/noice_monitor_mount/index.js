const io = require('socket.io-client')
const {exec} = require('child_process')
const path = require('path')
const config = require('../../config')
const NoicePatterns= require('./noice-patterns/NoicePatterns.js')
const NOICE = new NoicePatterns()


console.log(`Trying to connect to socket hub ${config.sockets.hub.domain}`)
const socket = io.connect(config.sockets.hub.domain)

// function firePattern () {
//     return new Promise((resolve, reject) => {
//         NOICE
//             .firePattern(NOICE.patterns.ALLON)
//             .then(() => {
//                 NOICE.firePattern(NOICE.patterns.ALLOFF)
//             })
//             .then(() => {
//                 NOICE.firePattern(NOICE.patterns.ALLON)
//             })
//             .then(() => {
//                 NOICE.firePattern(NOICE.patterns.ALLOFF)
//             })
//             .then(resolve)
//             .catch(reject)
//     })
// }

socket.on('connect', () => {
    console.log('connected')

    // socket.emit('login', 'log me in plz', 'pretty plz', 'another argument')

    socket.on('response', (...args) => {
        console.log(args)
    })

    // socket.on('noice', (...args) => {
    //     firePattern()
    //         .then(console.log('request complete'))
    // })

    socket.on('fire-pattern', payload => {
        console.log(`received fire-pattern message from server with payload: ${JSON.stringify(payload)}`)

        if (payload.type === 'pattern') {
            NOICE.firePattern(patternName)
                .then(() => {
                    socket.emit('fire-pattern-complete')
                })
        } else if (payload.type === 'letter') {
            NOICE.toggleLetter(payload.letter)
                .then(() => {
                    socket.emit('fire-pattern-complete')
                })
        }

     })
})

socket.on('connect_error', error => console.error(error))
