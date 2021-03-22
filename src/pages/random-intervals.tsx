import React, { useState } from 'react';

import { RandomIntervals } from '../features/random-intervals/RandomIntervals';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { Chord } from '../types/Chord';
import { ConcreteChord } from '../types/ConcreteChord';
import { Degree } from '../types/Degree';
import { Note } from '../types/Note';
import StreamWrapper from '../ui/components/StreamWrapper';

const RandomIntervalsPage = () => {
  const [chord, setChord] = useState<ConcreteChord>(new ConcreteChord(new Note('A'), new Chord(undefined, [new Degree('1')])));

  return (
    <Main meta={<Meta title="Chord Tones" description="Practice Chord Tones" />}>
      <StreamWrapper
        content={(stream) => (
          <RandomIntervals stream={stream} chord={chord} setChord={setChord} />
        )}
      />
    </Main>
  );
};

export default RandomIntervalsPage;
