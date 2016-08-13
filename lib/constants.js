module.exports = {
  parameters: {
    config: [
      'manifest',
      'onDone',
      'onProgress',
      'onError'
    ],
    manifest: [
      'type',
      'src',
      'stream',
      'credentials',
      'parser'
    ],
    parser: [
      'onData',
      'onDone'
    ]
  },
  states: {
    ERROR: -1,
    DATA: 0,
    COMPLETE: 1
  }
}
