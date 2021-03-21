import React from 'react';

import { Chord } from '../../../types/Chord';
import { ConcreteChord } from '../../../types/ConcreteChord';
import { Degree } from '../../../types/Degree';
import { Note } from '../../../types/Note';
import { ChordUI } from './ChordUI';

export const ChordsEditor = ({
  chords,
  setChords,
}: {
  chords: ConcreteChord[];
  setChords: (chords: ConcreteChord[]) => void;
}) => {
  const setChord = (chord: ConcreteChord) => (newChord: ConcreteChord) => {
    const index = chords.indexOf(chord);
    if (index !== -1) {
      const newChords = [...chords];
      newChords.splice(index, 1, newChord);
      setChords(newChords);
    }
  };

  const removeChord = (chord: ConcreteChord) => () => {
    const index = chords.indexOf(chord);
    if (index !== -1) {
      const newChords = [...chords];
      newChords.splice(index, 1);
      setChords(newChords);
    }
  };

  const chordsList = chords.map((chord, index) => (
    <ChordUI key={index} chord={chord} setChord={setChord(chord)} onRemove={removeChord(chord)} />
  ));

  return (
    <div className="flex flex-col items-center">
      {chordsList}
      <button
        type="button"
        className="text-pink-500 w-max"
        onClick={() => setChords(
          chords.concat([
            new ConcreteChord(
              new Note('A'),
              new Chord(undefined, [new Degree('1'), new Degree('3'), new Degree('5')]),
            ),
          ]),
        )}
      >
        Add Chord
      </button>
    </div>
  );
};
