export const flattenArray = (
  channelBuffer: Float32Array[],
  recordingLength: number
): Float32Array => {
  let offset = 0

  return channelBuffer.reduce((acc, buffer) => {
    acc.set(buffer, offset)
    offset += buffer.length
    return acc
  }, new Float32Array(recordingLength))
}

export const interleave = (leftChannel: Float32Array, rightChannel: Float32Array) => {
  const length = leftChannel.length + rightChannel.length

  return leftChannel.reduce((acc, _, index) => {
    const offset = index * 2

    acc[offset] = leftChannel[index]
    acc[offset + 1] = leftChannel[index]
    return acc
  }, new Float32Array(length))
}

export const writeUTFBytes = (view: DataView, offset: number, str: string): any => {
  str
    .split('')
    .map((_, index) => str.charCodeAt(index))
    .forEach((value, idx) => {
      view.setUint8(offset + idx, value)
    })
}
