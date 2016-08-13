var states = require('./constants').states

module.exports = function Loader (name, cancel) {
  this.state = states.DATA
  this.ready = false
  this.progress = 0
  this.name = name
  this.cancel = cancel
}
