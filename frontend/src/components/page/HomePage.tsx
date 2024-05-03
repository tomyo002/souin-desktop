import React from 'react';
import { getInstance } from 'src/service';
import { Path } from 'src/utils';

import { Button, H1, Link } from '../atomic';
import { Main } from '../layout';

export const HomePage: React.FC = () => {
  const instance = getInstance();
  return (
    <Main>
      <H1 content="Welcome on Souin Desktop" />
      <Link to={Path.form}>
        <Button className="btn-outline btn-accent">New instance</Button>
      </Link>
      {instance && (
        <Link to={Path.chart}>
          <Button className="btn-outline btn-info">Instance</Button>
        </Link>
      )}
    </Main>
  );
};

//layout
