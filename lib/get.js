/* global XMLHttpRequest */

var Loader = require('./Loader')
var constants = require('./constants')
var states = constants.states

function get (request, assets, onError, onComplete, onProgress) {
  var name = request.name
  var stream = request.stream
  var binary = request.type === 'binary'
  var parser = request.parser

  var xhr = new XMLHttpRequest()
  var asset = null

  var loader = new Loader(name, cancel)

  if (stream) {
    xhr.onreadystatechange = onReadyStateChange
  } else {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        onReadyStateChange()
      }
    }
  }

  if (binary) {
    xhr.responseType = 'arraybuffer'
  }

  function onReadyStateChange () {
    if (xhr.readyState < 2 ||
        loader.state === states.COMPLETE ||
        loader.state === states.ERROR) {
      return
    }
    if (xhr.status !== 200) {
      return onError('error loading resource "' + request.name + '"')
    }
    if (xhr.readyState > 2 && loader.state === states.DATA) {
      var response
      if (request.type === 'binary') {
        response = xhr.response
      } else {
        response = xhr.responseText
      }
      if (parser.data) {
        try {
          asset = parser.data(response)
        } catch (e) {
          return onError(e)
        }
      } else {
        asset = response
      }
    }
    if (xhr.readyState > 3 && loader.state === states.DATA) {
      if (parser.done) {
        try {
          asset = parser.done()
        } catch (e) {
          return onError(e)
        }
      }
      loader.state = states.COMPLETE
    }
    assets[name] = asset
    loader.progress = 0.75 * loader.progress + 0.25
    loader.ready =
      (request.stream && !!asset) ||
      loader.state === states.COMPLETE
    onProgress()
  }

  function cancel () {
    if (loader.state === states.COMPLETE || loader.state === states.ERROR) {
      return
    }
    xhr.onreadystatechange = null
    xhr.abort()
    loader.state = states.ERROR
  }

  // set up request
  if (request.credentials) {
    xhr.withCredentials = true
  }
  xhr.open('GET', request.src, true)
  xhr.send()

  return loader
}

module.exports = get
