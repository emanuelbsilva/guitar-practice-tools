import { Degree } from './Degree';

const CHORD_NAMES = {
  '1 3 5': '',
  '1 b3 5': 'min',
  '1 3 5 b7': '7',
  '1 b3 5 b7': 'min7',
  '1 3 5 7': 'maj7',
  '1 2 5': 'sus2',
  '1 4 5': 'sus4',
};

export class ChordNames {
  static getChordName(degrees: Degree[]) {
    const index = degrees.map((degree) => degree.toString()).join(' ');
    return this.containsChordName(index) ? CHORD_NAMES[index] : null;
  }

  static containsChordName(value: string): value is keyof typeof CHORD_NAMES {
    return value in CHORD_NAMES;
  }
}
