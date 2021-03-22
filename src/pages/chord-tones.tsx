import React, { useState } from 'react';

import { ChordTones } from '../features/chord-tones/ChordTones';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { ConcreteChord } from '../types/ConcreteChord';
import StreamWrapper from '../ui/components/StreamWrapper';

const ChordTonesMain = () => {
  const [chords, setChords] = useState<ConcreteChord[]>([]);

  return (
    <Main meta={<Meta title="Chord Tones" description="Practice Chord Tones" />}>
      <StreamWrapper
        content={(stream) => <ChordTones stream={stream} chords={chords} setChords={setChords} />}
      />
    </Main>
  );
};

export default ChordTonesMain;
