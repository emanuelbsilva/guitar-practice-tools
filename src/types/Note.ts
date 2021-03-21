import { NOTES } from './constants';
import { Degree } from './Degree';

export class Note {
  note: string;

  constructor(note: string) {
    if (!NOTES.includes(note)) throw new Error(`Note: ${note} is not a valid note`);
    this.note = note;
  }

  isSame(note: Note) {
    return this.toString() === note.toString();
  }

  toString() {
    return this.note;
  }

  getNoteNumber() {
    return NOTES.indexOf(this.note);
  }

  getDegreeNote(degree: Degree) {
    return new Note(NOTES[(this.getNoteNumber() + degree.getDegreeNumber()) % NOTES.length]);
  }
}
