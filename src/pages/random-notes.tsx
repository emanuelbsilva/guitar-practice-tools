import React, { useState } from 'react';

import { RandomNotes } from '../features/random-notes/RandomNotes';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { Note } from '../types/Note';
import StreamWrapper from '../ui/components/StreamWrapper';
import { getRandomNote } from '../utils/getRandomNote';

const RandomNotesPage = () => {
  const [currentNote, setCurrentNote] = useState<Note>(getRandomNote([]));

  return (
    <Main meta={<Meta title="Chord Tones" description="Practice Chord Tones" />}>
      <StreamWrapper
        content={(stream) => (
          <RandomNotes stream={stream} currentNote={currentNote} setCurrentNote={setCurrentNote} />
        )}
      />
    </Main>
  );
};

export default RandomNotesPage;
