import { ChordNames } from './ChordNames';
import { Degree } from './Degree';
import { MaybeString } from './types';

export class Chord {
  name: MaybeString;

  degrees: Degree[];

  constructor(name: MaybeString, degrees: Degree[]) {
    this.name = name;
    this.degrees = degrees;
  }

  getDegrees() {
    return this.degrees;
  }

  toString() {
    const chordName = ChordNames.getChordName(this.getDegrees());

    return chordName !== undefined
      ? chordName
      : this.name
          || this.getDegrees()
            .map((degree) => degree.toString())
            .join('');
  }
}
