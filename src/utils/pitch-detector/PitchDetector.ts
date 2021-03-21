import EventEmitter from 'eventemitter3';

import { NOTES } from '../../types/constants';
import { Note } from '../../types/Note';
import { autoCorrelate, noteFromPitch } from './utils';

export class PitchDetector extends EventEmitter {
  protected interval: NodeJS.Timeout | undefined;

  protected audioContext: AudioContext;

  protected sourceNode: MediaStreamAudioSourceNode;

  protected buffer: Float32Array;

  protected analyser: AnalyserNode;

  constructor(audioContext: AudioContext, sourceNode: MediaStreamAudioSourceNode) {
    super();
    this.audioContext = audioContext;
    this.sourceNode = sourceNode;
    const buflen = 2048;
    this.buffer = new Float32Array(buflen);
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    sourceNode.connect(this.analyser);
  }

  start() {
    this.interval = setInterval(() => {
      this.analyser.getFloatTimeDomainData(this.buffer);
      const pitch = autoCorrelate(this.buffer, this.audioContext.sampleRate);
      if (pitch !== -1) {
        const note = noteFromPitch(pitch);
        this.emit('note-detected', new Note(NOTES[note % 12]));
      }
    }, 100);
  }

  stop() {
    if (this.interval) { clearInterval(this.interval); }
  }
}
