const {Gpio} = require('onoff')
//const Gpio = require('../../onoff-mock.js')
const co = require('co')

class NoicePatterns {
	constructor () {
		this.leds = {}
		this.leds.N = new Gpio(26, 'out')
		this.leds.O = new Gpio(19, 'out')
		this.leds.I = new Gpio(13, 'out')
		this.leds.C = new Gpio(6, 'out')
		this.leds.E = new Gpio(5, 'out')

		this.delay = 100

		this.constants = {
			ON: 1,
			OFF: 0,
			patterns: {
				EACHLETTERTHENBLINK: 'eachLetterThenBlink',
				ALLON: 'allOn',
				ALLOFF: 'allOff'
			}
		}
	}

	get patterns () {
		return this.constants.patterns
	}

	firePattern (patternConstant = null) {
		return new Promise((resolve, reject) => {
			if (!this[patternConstant].name) {
				reject(`Pattern "${patternConstant}" not found.`)
			}

			this[patternConstant]()
			resolve()
		})
	}

	toggleLetter (letter) {
		return new Promise((resolve, reject) => {
			const letterPin = this.leds[letter]
            console.log(`target letter: ${letter}`)
			console.log(`selected letter: ${letterPin}`)
            console.log(`current pin state: ${letterPin.readSync()}`)
			if (letterPin.readSync()) {
				letterPin.writeSync(this.constants.OFF)
			} else {
				letterPin.writeSync(this.constants.ON)
			}
			resolve()
		})
	}

	eachLetterThenBlink () {
		return new Promise((resolve, reject) => {
			const me = this
			co(function *() {
				yield me.turnOn(me.leds.N)
				yield me.turnOn(me.leds.O)
				yield me.turnOn(me.leds.I)
				yield me.turnOn(me.leds.C)
				yield me.turnOn(me.leds.E)

				yield me.allOff()
				yield me.allOn()
				yield me.allOff()
				yield me.allOn()
				yield me.allOff()
				yield me.allOn()
				yield me.allOff()
				yield me.allOn()
				yield me.allOff()

				yield me.turnOn(me.leds.N)
				yield me.turnOn(me.leds.O)
				yield me.turnOn(me.leds.I)
				yield me.turnOn(me.leds.C)
				yield me.turnOn(me.leds.E)

				yield me.allOff()
				yield me.allOn()
				yield me.allOff()
				yield me.allOn()
				yield me.allOff()
				yield me.allOn()
				yield me.allOff()
				yield me.allOn()
				yield me.allOff()

				resolve()
			})
			.catch(error => reject(error))
		})
	}

	turnOn (led) {
		return new Promise((resolve, reject) => {
			led.writeSync(this.constants.ON)
			setTimeout(resolve, this.delay)
		})
	}

	allOn () {
		return new Promise((resolve, reject) => {
			Object.keys(this.leds).forEach(letter => this.leds[letter].writeSync(this.constants.ON))
			setTimeout(resolve, this.delay)
		})
	}

	allOff () {
		return new Promise((resolve, reject) => {
			Object.keys(this.leds).forEach(letter => this.leds[letter].writeSync(this.constants.OFF))
			setTimeout(resolve, this.delay)
		})
	}
}

module.exports = NoicePatterns
