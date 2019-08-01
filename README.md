<div align="center">
        <img src="media/logo.png" title="logo" alt="logo" width="500">
        <p>
                <b>A tiny library for converting browser's audio to WAV/PCM</b>
        </p>
        <br>
</div>


**zero** dependency  
uses browser's api MediaDevices.getUserMedia()

## usage
```
npm install microphone-js
```

```javascript
import { Microphone } from 'microphone-js'

const mic = Microphone();
// const mic = Microphone({ isMono: true, sampleRate: 16000 }); if you yant mono 16KHz, default is stereo 44kHz

mic.start();

mic.stop();

// continue recording
mic.start();

const blob = mic.getBlob();

mic.download();

// reset recording buffer
mic.reset();    
```

## Resources
---
- [http://soundfile.sapp.org/doc/WaveFormat/](http://soundfile.sapp.org/doc/WaveFormat/)
- [https://gist.github.com/meziantou/edb7217fddfbb70e899e](https://gist.github.com/meziantou/edb7217fddfbb70e899e)
- [https://github.com/alexjoverm/typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter)
