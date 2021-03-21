import React from 'react';

import { ConcreteChord } from '../../../types/ConcreteChord';
import { EmptyCallback } from '../../../types/types';
import { pencilIcon, xIcon } from '../../../ui/icons/index';

export const ChordPreview = (
  { chord, onEdit, onRemove }:
  {chord: ConcreteChord, onEdit: EmptyCallback, onRemove: EmptyCallback},
) => (
  <div className="flex flex-row items-center group">
    <p className="text-6xl text-green-500 mb-5 mr-5">{chord.toString()}</p>
    <button type="button" className="w-5 h-5 opacity-0 group-hover:opacity-100 text-white" onClick={onEdit}>
      {pencilIcon}
    </button>
    <button type="button" className="w-5 h-5 opacity-0 group-hover:opacity-100 text-red-700" onClick={onRemove}>
      {xIcon}
    </button>
  </div>
);
