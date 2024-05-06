import React from 'react';
import { Link } from 'react-router-dom';
import { getInstance } from 'src/service';
import { path } from 'src/utils';

import { Button, H1 } from '../atomic';
import { Layout } from '../layout';

export const HomePage: React.FC = () => {
  const instance = getInstance();
  return (
    <Layout>
      <H1 content="Welcome on Souin Desktop" />
      <Link to={path.FORM}>
        <Button className="btn-outline btn-accent">New instance</Button>
      </Link>
      {instance && (
        <Link to={path.CHART}>
          <Button className="btn-outline btn-info">Instance</Button>
        </Link>
      )}
    </Layout>
  );
};
