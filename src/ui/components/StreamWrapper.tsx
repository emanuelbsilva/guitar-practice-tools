import React, { useState } from 'react';

import { useUserMedia } from '../../utils/effects/useUserMedia';
import { cogIcon } from '../icons/index';
import { GeneralSettings } from './GeneralSettings';

type IStreamWrapperProps = {
  content: (stream: MediaStream) => JSX.Element
};

const StreamWrapper = (props: IStreamWrapperProps) => {
  const {
    state, inputStream, inputDeviceId, setInputDeviceId, requestPermission,
  } = useUserMedia();

  const [settingsOpen, setSettingsOpen] = useState(false);

  let content;

  switch (state) {
    case 'loading':
      content = <p className="text-white font-sans text-2xl">loading...</p>;
      break;

    case 'error':
      content = (
        <div>
          <p>error</p>
          <button type="button" onClick={requestPermission}>
            Give Permission
          </button>
        </div>
      );
      break;

    case 'ready':
      if (inputStream) {
        content = props.content(inputStream);
      }
      break;

    default:
      break;
  }

  return (
    <>
      {settingsOpen ? (
        <GeneralSettings
          onClose={() => setSettingsOpen(false)}
          inputDeviceId={inputDeviceId}
          setInputDeviceId={setInputDeviceId}
        />
      ) : (
        <div className="fixed top-2 right-2">
          <button
            type="button"
            className="text-gray-100 w-10 h-10 "
            onClick={() => setSettingsOpen(true)}
          >
            {cogIcon}
          </button>
        </div>
      )}
      {content}
    </>
  );
};

export default StreamWrapper;
