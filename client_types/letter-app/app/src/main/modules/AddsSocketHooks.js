import {ipcMain} from 'electron'
import socketConstructor from 'socket.io-client'
import config from '../../../config'

const socket = socketConstructor(config.host)

socket.on('connect', () => console.log(`connected to socket host: ${config.host}`))

function addsListeners () {
  ipcMain.on('activate', (event, payload) => {

    console.log(`sending activation type: ${payload.type}`)
    console.log(`sending activation for word: ${payload.wordId}`)
    console.log(`sending activation for key: ${payload.activationKey}`)

    socket.emit('fire-activation', payload, result => {
      event.sender.send('activation-complete', result)
    })
  })
}

export default addsListeners
