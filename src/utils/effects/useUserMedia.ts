import { useEffect, useState } from 'react';

type IState = 'loading' | 'ready' | 'error';

export const useUserMedia = () => {
  const [inputDeviceId, setInputDeviceId] = useState<string>('');
  const [inputStream, setInputStream] = useState<MediaStream>();
  const [state, setState] = useState<IState>('loading');

  const requestPermission = () => {
    setState('loading');
    navigator.mediaDevices
      .getUserMedia({ audio: inputDeviceId ? { deviceId: inputDeviceId } : true })

      .then((stream) => {
        setInputStream(stream);
        setState('ready');
      })
      .catch(() => {
        setState('error');
      });
  };

  useEffect(() => {
    requestPermission();
  }, [inputDeviceId]);

  return {
    state, inputStream, inputDeviceId, setInputDeviceId, requestPermission,
  };
};
