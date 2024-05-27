import React from 'react';
import { Link } from 'react-router-dom';
import { useAllInstances, useSetInstances } from 'src/context';
import { path } from 'src/utils';

import { ButtonOutline, H1 } from '../atomic';
import { Layout } from '../layout';

export const HomePage: React.FC = () => {
  const setInstances = useSetInstances();
  return (
    <Layout>
      <H1 content="Welcome on Souin Desktop" />
      <Link to={path.FORM}>
        <ButtonOutline className="btn-accent">New instance</ButtonOutline>
      </Link>
      {!!useAllInstances().length && (
        <>
          <ButtonOutline
            className="btn-error"
            onClick={() => {
              setInstances([]);
            }}
          >
            Clear instances
          </ButtonOutline>
          <Link to={path.CHART}>
            <ButtonOutline className="btn-info">Instance</ButtonOutline>
          </Link>
        </>
      )}
    </Layout>
  );
};
