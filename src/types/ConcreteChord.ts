import { Chord } from './Chord';
import { ConcreteScale } from './ConcreteScale';
import { Note } from './Note';
import { Scale } from './Scale';

export class ConcreteChord {
  protected rootNote: Note;

  protected chord: Chord;

  constructor(rootNote: Note, chord: Chord) {
    this.rootNote = rootNote;
    this.chord = chord;
  }

  getRootNote() {
    return this.rootNote;
  }

  getChord() {
    return this.chord;
  }

  getChordNotes() {
    return new ConcreteScale(this.rootNote, new Scale(this.chord.getDegrees()));
  }

  toString() {
    return `${this.rootNote.toString()}${this.chord.toString()}`;
  }
}
