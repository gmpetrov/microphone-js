# Microphone.js

A tiny library for converting browser's audio to WAV/PCM 16bits 44kHz  
**zero** dependency  
uses browser's api MediaDevices.getUserMedia()

## usage
```
npm install microphone-js
```

```javascript
import Microphone from 'microphone-js'

const mic = Microphone();
// const mic = Microphone({nbChannels: 1}); if you yant mono

mic.start();

mic.stop();

// stereo audio/wav PCM 16 bits 44100 Hz 
const blob = mic.getBlob();

mic.download();
```

## Resources
---
- [http://soundfile.sapp.org/doc/WaveFormat/](http://soundfile.sapp.org/doc/WaveFormat/)
- [https://gist.github.com/meziantou/edb7217fddfbb70e899e](https://gist.github.com/meziantou/edb7217fddfbb70e899e)
- [https://github.com/alexjoverm/typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)
