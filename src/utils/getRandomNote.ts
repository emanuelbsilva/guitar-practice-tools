import { NOTES } from '../types/constants';
import { Note } from '../types/Note';
import { getRandomNumber } from './misc';

export const getRandomNote = (exceptions: Note[]) => {
  const exceptionsNotes = exceptions.map((exceptionNote) => exceptionNote.toString());
  const possibleNotes = NOTES.filter((note) => !exceptionsNotes.includes(note));
  const numberOfPossibleNotes = possibleNotes.length;
  const index = getRandomNumber(0, numberOfPossibleNotes - 1);
  return new Note(possibleNotes[index]);
};
