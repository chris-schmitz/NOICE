import {ipcMain} from 'electron'
import socketConstructor from 'socket.io-client'
import config from '../../../config'

const socket = socketConstructor(config.host)

socket.on('connect', () => console.log(`connected to socket host: ${config.host}`))

function addsListeners () {
  ipcMain.on('activate', (event, payload) => {

    console.log(`activation payload: ${JSON.stringify(payload)}`)

    socket.emit('fire-activation', payload)

    socket.on('activation-complete', response => {
      console.log('socket server response received')
      event.sender.send('activation-complete', response)
    })
  })
}

export default addsListeners
