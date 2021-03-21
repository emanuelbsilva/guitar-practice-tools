import React from 'react';

import { ConcreteChord } from '../../types/ConcreteChord';

export const DetectChordTones = ({
  chord,
  currentDegreeIndex,
}: {
  chord: ConcreteChord;
  currentDegreeIndex: Number;
}) => {
  const degrees = chord.getChord().getDegrees();

  const getDegreeClass = (degreeIndex: Number) => {
    if (degreeIndex === currentDegreeIndex) return 'text-white';
    if (degreeIndex < currentDegreeIndex) return 'text-gray-900';
    return 'text-black';
  };

  return (
    <div>
      <h1 className="text-6xl text-green-500 border-b-2 pb-4 text-center">{chord.toString()}</h1>
      <div className="flex flex-row justify-center space-x-4 p-2">
        {degrees.map((degree, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index} className={`text-2xl ${getDegreeClass(index)}`}>
            {degree.toString()}
          </p>
        ))}
      </div>
    </div>
  );
};
