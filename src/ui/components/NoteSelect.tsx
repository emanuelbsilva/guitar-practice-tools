import React from 'react';

import { NOTES } from '../../types/constants';
import { Note } from '../../types/Note';

export const NoteSelect = (
  { note, setNote }:
  {note: Note, setNote: (note: Note) => void},
) => (
  <select value={note.toString()} onChange={(evt) => setNote(new Note(evt.target.value))}>
    {NOTES.map((currentNote) => (
      <option key={currentNote} value={currentNote}>
        {currentNote}
      </option>
    ))}
  </select>
);
