import React, { useEffect, useState } from 'react';

import * as Tone from 'tone';

import { ConcreteChord } from '../../types/ConcreteChord';
import { PitchDetector } from '../../utils/pitch-detector/PitchDetector';
import { DetectChordTones } from './DetectChordTones';

export const ChordTonesDetection = (
  { stream, chords }:
  { stream: MediaStream; chords: ConcreteChord[] },
) => {
  const [pitchDetector, setPitchDetector] = useState<PitchDetector>();

  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);

  const currentChord = chords[currentChordIndex];
  const currentChordNotes = currentChord.getChordNotes().getNotes();
  const currentNote = currentChordNotes[currentNoteIndex];

  let synth: Tone.PolySynth;

  function next() {
    const nextNoteIndex = currentNoteIndex + 1;
    if (nextNoteIndex === currentChordNotes.length) {
      setCurrentChordIndex((currentChordIndex + 1) % chords.length);
      setCurrentNoteIndex(0);
    } else {
      setCurrentNoteIndex(nextNoteIndex);
    }
  }

  useEffect(() => {
    if (!synth) return;
    Tone.Transport.bpm.value = 90;
    const synthChord = currentChord
      .getChordNotes()
      .getNotes()
      .map((note) => `${note.toString()}4`);
    synth.triggerAttackRelease(synthChord.slice(0, -1), '4n');
  }, [currentChordIndex]);

  useEffect(() => {
    synth = new Tone.PolySynth(Tone.Synth).toDestination();
  });

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
        if (currentNote.isSame(note)) {
          next();
        }
      });
    }

    return () => {
      if (pitchDetector) pitchDetector.off('note-detected');
    };
  }, [currentNote, currentChordIndex, pitchDetector]);

  return (
    <div>
      <DetectChordTones chord={currentChord} currentDegreeIndex={currentNoteIndex} />
    </div>
  );
};
