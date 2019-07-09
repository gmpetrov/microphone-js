import { writeUTFBytes, flattenArray, interleave } from './utils'

const NB_CHANNELS = 2
const SAMPLE_RATE = 44100
const BUFFER_SIZE = 2048
const LEFT_CHAN_DATA = 0
const RIGHT_CHAN_DATA = 1

const Microphone = (customConfig?: CustomConfig): MicrophoneInstance => {
  let mediaStream: MediaStream | undefined
  let source: MediaStreamAudioSourceNode | undefined
  let recorder: ScriptProcessorNode | undefined
  let blob: Blob | undefined
  let audioState: AudioState = {
    leftChan: [],
    rightChan: [],
    recordingLength: 0
  }

  const customNbChannels: number = (customConfig && customConfig.nbChannels) || NB_CHANNELS
  const isMono: boolean = customNbChannels === 1
  const config: Config = {
    nbChannels: customNbChannels,
    sampleRate: SAMPLE_RATE,
    bufferSize: BUFFER_SIZE,
    byteRate: SAMPLE_RATE * customNbChannels * 2
  }

  const start = async () => {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })

    const audioCtx = new AudioContext()
    const volume = audioCtx.createGain()
    source = audioCtx.createMediaStreamSource(mediaStream)

    const numberOfInputChannels = 2
    const numberOfOutputChannels = 2

    recorder = audioCtx.createScriptProcessor(
      config.bufferSize,
      numberOfInputChannels,
      numberOfOutputChannels
    )

    recorder.onaudioprocess = (event: AudioProcessingEvent) => {
      if (customConfig && customConfig.onData) {
        customConfig.onData(event)
      }

      audioState.leftChan.push(new Float32Array(event.inputBuffer.getChannelData(LEFT_CHAN_DATA)))
      audioState.rightChan.push(new Float32Array(event.inputBuffer.getChannelData(RIGHT_CHAN_DATA)))
      audioState.recordingLength += config.bufferSize
    }

    source.connect(volume)
    source.connect(recorder)
    recorder.connect(audioCtx.destination)
  }

  const reset = () => {
    audioState = {
      leftChan: [],
      rightChan: [],
      recordingLength: 0
    }
  }

  // http://soundfile.sapp.org/doc/WaveFormat/
  const encodeWav = (data: Float32Array): Blob => {
    const arrayBuffer = new ArrayBuffer(44 + data.length * 2)
    const view = new DataView(arrayBuffer)

    writeUTFBytes(view, 0, 'RIFF')
    view.setUint32(4, 44 + data.length * 2, true)
    writeUTFBytes(view, 8, 'WAVE')
    writeUTFBytes(view, 12, 'fmt ')
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, config.nbChannels, true)
    view.setUint32(24, config.sampleRate, true)
    view.setUint32(28, config.byteRate, true)
    view.setUint16(32, 4, true)
    view.setUint16(34, 16, true)
    writeUTFBytes(view, 36, 'data')
    view.setUint32(40, data.length * 2, true)

    for (let i = 0; i < data.length; i++) {
      view.setInt16(44 + i * 2, (data[i] as any) * 0x7fff, true)
    }

    return new Blob([view], { type: 'audio/wav' })
  }

  const stop = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track: MediaStreamTrack) => track.stop())

      mediaStream = undefined
    }

    if (recorder) {
      recorder.disconnect()
      recorder = undefined
    }

    if (source) {
      source.disconnect()
      recorder = undefined
    }

    const leftChanData = flattenArray(audioState.leftChan, audioState.recordingLength)
    const rightChanData = flattenArray(audioState.rightChan, audioState.recordingLength)
    const array = isMono ? leftChanData : interleave(leftChanData, rightChanData)

    blob = encodeWav(array)
  }

  const download = () => {
    if (!blob || !window || !document || !URL) {
      return
    }

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = `${new Date().toISOString()}.wav`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getBlob = () => blob

  return {
    start,
    stop,
    reset,
    download,
    getBlob
  }
}

export default Microphone
