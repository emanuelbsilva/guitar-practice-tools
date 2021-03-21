import React from 'react';

import { EmptyCallback } from '../../types/types';
import { xIcon } from '../icons/index';
import { InputDeviceSelect } from './InputDeviceSelect';

export const GeneralSettings = ({
  inputDeviceId,
  setInputDeviceId,
  onClose,
}: {
  inputDeviceId: string;
  setInputDeviceId: (deviceId: string) => void;
  onClose: EmptyCallback;
}) => (
  <div className="fixed top-2 right-2 bg-gradient-to-br from-gray-100 to-white p-10 rounded-xl shadow-2xl">
    <button type="button" className="absolute top-2 right-2 text-black w-10 h-10" onClick={onClose}>
      {xIcon}
    </button>
    <h3 className="text-3xl mb-4">Settings</h3>
    <InputDeviceSelect inputDeviceId={inputDeviceId} setInputDeviceId={setInputDeviceId} />
  </div>
);
