import React, { useEffect, useState } from 'react';

import { ConcreteChord } from '../../types/ConcreteChord';
import { usePitchDetector } from '../../utils/effects/usePitchDetector';
import { getRandomNumber } from '../../utils/misc';
import { ChordEditor } from '../chord-tones/chords-editor/ChordEditor';

type IRandomIntervalsProps = {
  stream: MediaStream;
  chord: ConcreteChord;
  setChord: (chord: ConcreteChord) => void;
};

const RandomIntervals = (props: IRandomIntervalsProps) => {
  const [state, setState] = useState<'playing'|'editing'>('editing');
  const [currentDegreeIndex, setCurrentDegreeIndex] = useState(0);

  const currentChordNotes = props.chord.getChordNotes().getNotes();
  const currentChordDegrees = props.chord.getChordNotes().getDegrees();
  const currentNote = currentChordNotes[currentDegreeIndex];
  const currentDegree = currentChordDegrees[currentDegreeIndex];

  const next = () => {
    setCurrentDegreeIndex(getRandomNumber(0, currentChordNotes.length - 1));
  };

  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(currentDegree.toString().replace('b', 'flat '));
    speechSynthesis.speak(utterance);
  }, [currentDegree]);

  usePitchDetector(
    props.stream,
    (note) => {
      if (note.isSame(currentNote)) {
        next();
      }
    },
    [currentNote],
  );

  switch (state) {
    case 'editing':
      return (
        <div>
          <ChordEditor chord={props.chord} onDone={props.setChord} />
          <button
            type="button"
            className="text-xl text-white mt-5 disabled:opacity-50"
            onClick={() => setState('playing')}
          >
            Go
          </button>
        </div>
      );
    case 'playing':
      return (
        <div>
          <p className="text-6xl text-green-500 border-b-2 text-center">{props.chord.toString()}</p>
          <p className="text-4xl text-white text-center">
            {currentDegree.toString()}
            {' '}
            (
            {currentNote.toString()}
            )
          </p>
          <button
            type="button"
            className="text-xl text-white mt-5 disabled:opacity-50"
            onClick={() => setState('editing')}
          >
            Edit
          </button>
        </div>
      );

    default:
      return <div />;
  }
};

export { RandomIntervals };
