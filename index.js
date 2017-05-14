const express = require('express')
server = express()
PORT = process.env.PORT

server.get('/', (request, response) => {
    response.json({test: 'worked'})
})

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`))