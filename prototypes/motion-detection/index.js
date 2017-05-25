const {Gpio} = require('onoff')

let sensor = Gpio(26, 'in')

sensor.watch((error, value) => {
    console.log('motion')
    console.log(error)
    console.log(value)
})

console.log('trying again')

/*
let led = {
    SENSOR: new Gpio(26, 'in'),
    N: new Gpio(14, 'out'),
    O: new Gpio(15, 'out'),
    I: new Gpio(18, 'out'),
    C: new Gpio(23, 'out'),
    E: new Gpio(24, 'out')
}

console.log(led.SENSOR.watch)

led.SENSOR.watch((error, value) => {
    console.log('motion!')
    led.N.writeSync(1)
})

console.log('watching for movement')
*/
