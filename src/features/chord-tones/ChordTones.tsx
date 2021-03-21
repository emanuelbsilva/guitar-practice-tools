import React, { useState } from 'react';

import { ConcreteChord } from '../../types/ConcreteChord';
import { ChordsEditor } from './chords-editor/ChordsEditor';
import { ChordTonesDetection } from './ChordTonesDetection';

export const ChordTones = (
  { stream, chords, setChords }:
  {stream: MediaStream, chords: ConcreteChord[], setChords: (chords: ConcreteChord[]) => void},
) => {
  const [state, setState] = useState('editing');

  let content;

  switch (state) {
    case 'editing':
      content = (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-4xl text-white mb-2 text-center">Chord Tones</h2>
          <p className="text-lg text-gray-200 mb-10 text-center w-1/2">
            Practice playing chord tones in different positions. Connect your guitar and choose your
            input (in the settings menu). Then, choose the chords that you want to practice and hit
            the Go button.
          </p>
          <div className="w-min text-center">
            <ChordsEditor chords={chords} setChords={setChords} />
            <button
              type="button"
              className="text-xl text-white mt-5 disabled:opacity-50"
              onClick={() => setState('playing')}
              disabled={chords.length === 0}
            >
              Go
            </button>
          </div>
        </div>
      );
      break;

    case 'playing':
      content = (
        <div className="flex flex-col justify-center">
          <ChordTonesDetection chords={chords} stream={stream} />
          <button
            type="button"
            className="text-xl text-white mt-5"
            onClick={() => setState('editing')}
          >
            Edit
          </button>
        </div>
      );
      break;

    default:
      break;
  }

  return <div>{content}</div>;
};
