interface AudioState {
  leftChan: Float32Array[]
  rightChan: Float32Array[]
  recordingLength: number
}

interface Config {
  nbChannels: number
  sampleRate: number
  bufferSize: number
  byteRate: number
}

interface CustomConfig {
  nbChannels?: number
  sampleRate?: number
  bufferSize?: number
  onData?: (event: any) => any
}

interface MicrophoneInstance {
  start: () => void
  stop: () => void
  reset: () => void
  download: () => void
  getBlob: () => Blob | undefined
}
