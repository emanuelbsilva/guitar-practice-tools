import React, { useEffect, useState } from 'react';

import { ChordTones } from '../features/chord-tones/ChordTones';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { ConcreteChord } from '../types/ConcreteChord';
import { GeneralSettings } from '../ui/components/GeneralSettings';
import { cogIcon } from '../ui/icons/index';

const ChordTonesMain = () => {
  const [inputDeviceId, setInputDeviceId] = useState<string>('');
  const [micPermission, setMicPermission] = useState('loading');
  const [inputStream, setInputStream] = useState<MediaStream>();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chords, setChords] = useState<ConcreteChord[]>([]);

  const requestPermission = () => {
    setMicPermission('loading');
    navigator.mediaDevices
      .getUserMedia({ audio: inputDeviceId ? { deviceId: inputDeviceId } : true })

      .then((stream) => {
        setInputStream(stream);
        setMicPermission('ready');
      })
      .catch(() => {
        setMicPermission('error');
      });
  };

  useEffect(() => {
    requestPermission();
  }, [inputDeviceId]);

  let content;

  switch (micPermission) {
    case 'loading':
      content = <p className="text-white font-sans text-2xl">loading...</p>;
      break;

    case 'error':
      content = (
        <div>
          <p>error</p>
          <button type="button" onClick={requestPermission}>Give Permission</button>
        </div>
      );
      break;

    case 'ready':
      if (inputStream) {
        content = (
          <ChordTones stream={inputStream} chords={chords} setChords={setChords} />
        );
      }
      break;

    default:
      break;
  }

  return (
    <Main meta={<Meta title="Chord Tones" description="Practice Chord Tones" />}>
      {settingsOpen ? (
        <GeneralSettings
          onClose={() => setSettingsOpen(false)}
          inputDeviceId={inputDeviceId}
          setInputDeviceId={setInputDeviceId}
        />
      ) : (
        <div className="fixed top-2 right-2">
          <button type="button" className="text-gray-100 w-10 h-10 " onClick={() => setSettingsOpen(true)}>
            {cogIcon}
          </button>
        </div>
      )}
      {content}
    </Main>
  );
};

export default ChordTonesMain;
