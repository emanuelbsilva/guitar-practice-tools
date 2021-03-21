import React, { useState } from 'react';

import { ConcreteChord } from '../../../types/ConcreteChord';
import { EmptyCallback } from '../../../types/types';
import { ChordEditor } from './ChordEditor';
import { ChordPreview } from './ChordPreview';

export const ChordUI = ({
  chord,
  setChord,
  onRemove,
}: {
  chord: ConcreteChord;
  setChord: (chord: ConcreteChord) => void;
  onRemove: EmptyCallback
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <ChordEditor
      chord={chord}
      onDone={(newChord: ConcreteChord) => {
        setChord(newChord);
        setIsEditing(false);
      }}
    />
  ) : (
    <ChordPreview chord={chord} onEdit={() => setIsEditing(true)} onRemove={onRemove} />
  );
};
