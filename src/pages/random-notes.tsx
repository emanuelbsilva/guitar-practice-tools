import React from 'react';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

const RandomNotesPage = () => (
  <Main meta={<Meta title="Random Notes" description="Random Note" />}>
    <p>Incoming</p>
  </Main>
);

export default RandomNotesPage;
