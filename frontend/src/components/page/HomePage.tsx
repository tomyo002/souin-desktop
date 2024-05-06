import React from 'react';
import { Link } from 'react-router-dom';
import { useAllInstances } from 'src/context';
import { path } from 'src/utils';

import { ButtonOutline, H1 } from '../atomic';
import { Layout } from '../layout';

export const HomePage: React.FC = () => {
  const instances = useAllInstances().length !== 0;
  return (
    <Layout>
      <H1 content="Welcome on Souin Desktop" />
      <Link to={path.FORM}>
        <ButtonOutline className="btn-accent">New instance</ButtonOutline>
      </Link>
      {instances && (
        <Link to={path.CHART}>
          <ButtonOutline className="btn-info">Instance</ButtonOutline>
        </Link>
      )}
    </Layout>
  );
};
