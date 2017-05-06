const {Gpio} = require('onoff')
const co = require('co')

let leds = {}
leds.N = new Gpio(14, 'out')
leds.O = new Gpio(15, 'out')
leds.I = new Gpio(18, 'out')
leds.C = new Gpio(23, 'out')
leds.E = new Gpio(24, 'out')

const ON = 1
const OFF = 0

co(function *() {
	yield turnOn(leds.N)
	yield turnOn(leds.O)
	yield turnOn(leds.I)
	yield turnOn(leds.C)
	yield turnOn(leds.E)

	yield allOff()
	yield allOn()
	yield allOff()
	yield allOff()
	yield allOn()
	yield allOff()
})
.catch(error => console.error(error))

function turnOn (led) {
	let delay = 500
	return new Promise((resolve, reject) => {
		led.writeSync(ON)
		setTimeout(resolve, delay)
	})
}

function allOn () {
	return new Promise((resolve, reject) => {
		Object.keys(leds).forEach(letter => leds[letter].writeSync(ON))
		setTimeout(resolve, 500)
	})
}

function allOff () {
	return new Promise((resolve, reject) => {
		Object.keys(leds).forEach(letter => leds[letter].writeSync(OFF))
		setTimeout(resolve, 400)
	})
}
