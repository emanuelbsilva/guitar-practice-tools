import React, { ReactNode } from 'react';

import Link from 'next/link';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="flex flex-col justify-center items-center select-none min-h-screen bg-gradient-to-br from-gray-900 to-blue-700">
    {props.meta}
    <div className="fixed top-2 left-2">
      <Link href="/chord-tones">
        <a className="text-white border-none hover:text-gray-400">Chord Tones</a>
      </Link>
      <span className="text-white ml-4 mr-4">|</span>
      <Link href="/random-notes">
        <a className="text-white border-none hover:text-gray-400">Random Notes</a>
      </Link>
      <span className="text-white ml-4 mr-4">|</span>
      <Link href="/random-intervals">
        <a className="text-white border-none hover:text-gray-400">Random Intervals</a>
      </Link>
    </div>
    {props.children}
  </div>
);

export { Main };
