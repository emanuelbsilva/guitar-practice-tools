import React, { useState } from 'react';

import { Chord } from '../../../types/Chord';
import { ConcreteChord } from '../../../types/ConcreteChord';
import { DEGREES } from '../../../types/constants';
import { Degree } from '../../../types/Degree';
import { NoteSelect } from '../../../ui/components/NoteSelect';
import { checkIcon, xIcon } from '../../../ui/icons/index';

export const ChordEditor = (
  { chord, onDone }:
  {chord: ConcreteChord, onDone: (chord: ConcreteChord) => void},
) => {
  const [selectedDegrees, setSelectedDegrees] = useState(
    chord
      .getChord()
      .getDegrees()
      .map((degree) => degree.toString()),
  );
  const [selectedNote, setSelectedNote] = useState(chord.getRootNote());

  const isDegreeSelected = (degree: string) => selectedDegrees.includes(degree);

  const toggleDegree = (degree: string) => () => setSelectedDegrees(
    isDegreeSelected(degree)
      ? selectedDegrees.filter((selectedDegree) => selectedDegree !== degree)
      : selectedDegrees.concat([degree]),
  );

  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-col">
        <NoteSelect note={selectedNote} setNote={setSelectedNote} />
        <div className="flex flex-row">
          {DEGREES.map((degree) => (
            <button
              type="button"
              key={degree}
              className={`px-1 ${isDegreeSelected(degree) ? 'text-white' : 'text-gray-500'}`}
              onClick={toggleDegree(degree)}
            >
              {degree}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="w-10 h-10 text-green-900"
        onClick={() => onDone(
          new ConcreteChord(
            selectedNote,
            new Chord(
              undefined,
              DEGREES.filter((d) => selectedDegrees.includes(d)).map(
                (selectedDegree) => new Degree(selectedDegree),
              ),
            ),
          ),
        )}
      >
        {checkIcon}
      </button>
      <button type="button" className="w-10 h-10 text-red-600" onClick={() => onDone(chord)}>
        {xIcon}
      </button>
    </div>
  );
};
