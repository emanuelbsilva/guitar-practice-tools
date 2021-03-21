import { Chord } from './Chord';

export class ChordProgression {
  chords: Chord[];

  constructor(chords: Chord[]) {
    this.chords = chords;
  }

  getChords() {
    return this.chords;
  }
}
