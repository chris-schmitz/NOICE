class onoffmock {
  constructor (pin, direction) {
    this._pin = pin
    this._direction = direction
  }

  writeSync (state) {
    console.log(`LED '${this.pin}' set to '${state}'.`)
  }

  get pin () {
    return this._pin
  }
}

module.exports = onoffmock