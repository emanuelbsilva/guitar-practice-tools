import { Note } from './Note';
import { Scale } from './Scale';

export class ConcreteScale {
  rootNote: Note;

  scale: Scale;

  constructor(rootNote: Note, scale: Scale) {
    this.rootNote = rootNote;
    this.scale = scale;
  }

  getScale() {
    return this.scale;
  }

  getDegrees() {
    return this.scale.getDegrees();
  }

  getNotes() {
    return this.scale.getDegrees().map((degree) => this.rootNote.getDegreeNote(degree));
  }
}
