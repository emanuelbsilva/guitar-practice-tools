import { DependencyList, useEffect, useState } from 'react';

import { Note } from '../../types/Note';
import { PitchDetector } from '../pitch-detector/PitchDetector';

export const usePitchDetector = (
  stream: MediaStream,
  callback: (note: Note) => void,
  deps?: DependencyList,
) => {
  const [pitchDetector, setPitchDetector] = useState<PitchDetector>();

  useEffect(() => {
    const audioContext = new AudioContext();
    const sourceNode = audioContext.createMediaStreamSource(stream);
    const myPitchDetector = new PitchDetector(audioContext, sourceNode);
    myPitchDetector.start();

    setPitchDetector(myPitchDetector);

    return () => {
      myPitchDetector.off('note-detected');
      myPitchDetector.stop();
      audioContext.close();
    };
  }, [stream]);

  useEffect(() => {
    if (pitchDetector) {
      pitchDetector.off('note-detected');
      pitchDetector.on('note-detected', (note) => {
        callback(note);
      });
    }

    return () => {
      if (pitchDetector) pitchDetector.off('note-detected');
    };
  }, [pitchDetector].concat(deps || []));
};
