import React from 'react';

import { Note } from '../../types/Note';
import { usePitchDetector } from '../../utils/effects/usePitchDetector';
import { getRandomNote } from '../../utils/getRandomNote';

type IRandomNotesProps = {
  stream: MediaStream;
  currentNote: Note;
  setCurrentNote: (note: Note) => void;
};

const RandomNotes = (props: IRandomNotesProps) => {
  usePitchDetector(props.stream, (note) => {
    if (note.isSame(props.currentNote)) {
      props.setCurrentNote(getRandomNote([note]));
    }
  }, [props.currentNote]);

  return (
    <div>
      <p className="text-6xl text-green-500 border-b-2 pb-4 text-center">
        {props.currentNote.toString()}
      </p>
    </div>
  );
};

export { RandomNotes };
