import React, { useEffect, useState } from 'react';

import { StringSetter } from '../../types/types';

export const InputDeviceSelect = ({
  inputDeviceId,
  setInputDeviceId,
}: {
  inputDeviceId: string;
  setInputDeviceId: StringSetter;
}) => {
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setAvailableDevices(devices.filter((device) => device.kind === 'audioinput'));
    });
  }, []);

  return (
    <div>
      <p className="block">Select Input Device</p>
      <select
        id="input-device-selector"
        className="block"
        defaultValue={inputDeviceId}
        onChange={(evt) => setInputDeviceId(evt.target.value)}
      >
        {availableDevices.map(({ deviceId, label }) => (
          <option key={deviceId} value={deviceId}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
