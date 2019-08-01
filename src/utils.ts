export const flattenArray = (
  channelBuffer: Float32Array[],
  recordingLength: number
): Float32Array => {
  let offset = 0;

  return channelBuffer.reduce((acc, buffer) => {
    acc.set(buffer, offset);
    offset += buffer.length;
    return acc;
  }, new Float32Array(recordingLength));
};

export const interleave = (
  leftChannel: Float32Array,
  rightChannel: Float32Array
) => {
  const length = leftChannel.length + rightChannel.length;

  return leftChannel.reduce((acc, _, index) => {
    const offset = index * 2;

    acc[offset] = leftChannel[index];
    acc[offset + 1] = leftChannel[index];
    return acc;
  }, new Float32Array(length));
};

export const writeUTFBytes = (
  view: DataView,
  offset: number,
  str: string
): any => {
  str
    .split('')
    .map((_, index) => str.charCodeAt(index))
    .forEach((value, idx) => {
      view.setUint8(offset + idx, value);
    });
};

export const downsampleBuffer = (
  buffer: Float32Array,
  currentSampleRate: number,
  targetSampleRate: number
) => {
  if (targetSampleRate === currentSampleRate) {
    return buffer;
  }
  var sampleRateRatio = currentSampleRate / targetSampleRate;
  var newLength = Math.round(buffer.length / sampleRateRatio);
  var result = new Float32Array(newLength);
  var offsetResult = 0;
  var offsetBuffer = 0;
  while (offsetResult < result.length) {
    var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
    var accum = 0,
      count = 0;
    for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
      accum += buffer[i];
      count++;
    }
    result[offsetResult] = accum / count;
    offsetResult++;
    offsetBuffer = nextOffsetBuffer;
  }
  return result;
};
