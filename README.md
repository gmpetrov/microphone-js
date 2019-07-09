# Microphone.js

A tiny library for converting browser's audio to WAV/PCM 16bits 44kHz  
**zero** dependency  
uses browser's api MediaDevices.getUserMedia()

## usage
```javascript
import Microphone from 'microphone'

const mic = Microphone();
// const mic = Microphone({nbChannels: 1}); if you yant mono

mic.start();

mic.stop();

// stereo audio/wav PCM 16 bits 44100 Hz 
const blob = mic.getBlob();

mic.download();
```
