import { ChordProgression } from './ChordProgression';
import { ConcreteChord } from './ConcreteChord';
import { Note } from './Note';

export class ConcreteChordProgression {
  rootNote: Note;

  progression: ChordProgression;

  constructor(rootNote: Note, chordProgression: ChordProgression) {
    this.rootNote = rootNote;
    this.progression = chordProgression;
  }

  getChords() {
    return this.progression.getChords().map((chord) => new ConcreteChord(this.rootNote, chord));
  }
}
