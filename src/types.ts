interface AudioState {
  leftChan: Float32Array[];
  rightChan: Float32Array[];
  recordingLength: number;
}

interface Config {
  nbChannels: number;
  sampleRate: number;
  bufferSize: number;
  byteRate: number;
}

interface InstanceConfig {
  isMono?: boolean;
  sampleRate?: number;
  onData?: (data: any) => any;
}

interface MicrophoneInstance {
  start: () => void;
  stop: () => void;
  reset: () => void;
  download: (blob?: Blob) => void;
  getBlob: () => Blob | undefined;
}
