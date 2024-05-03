import React from 'react';

import { Button, H1, Link } from '../atomic';
import { Main } from '../layout';

export const Home: React.FC = () => (
  <Main>
    <H1 content="Welcome on Souin Desktop" />
    <Link to="/form">
      <Button className="btn-outline btn-accent">New instance</Button>
    </Link>
    <Link to="/chart">
      <Button className="btn-outline btn-info">Instance</Button>
    </Link>
  </Main>
);

//layout
