import React, { ChangeEvent, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  AllowedStorage,
  storageContext,
  useAllInstances,
  useSetInstances,
} from 'src/context';
import { path } from 'src/utils';

import { ButtonOutline, H1 } from '../atomic';
import { Layout } from '../layout';

export const HomePage: React.FC = () => {
  const setInstances = useSetInstances();
  const { storage, setStorage } = useContext(storageContext);
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStorage(event.target.value as AllowedStorage);
  };

  return (
    <Layout>
      <H1 content="Welcome on Souin Desktop" />
      <select
        className="select select-bordered w-60"
        onChange={onChange}
        value={storage}
      >
        <option value="localStorage">Local</option>
        <option value="sqliteStorage">Sqlite</option>
      </select>
      <Link to={path.FORM}>
        <ButtonOutline className="btn-accent w-60">New instance</ButtonOutline>
      </Link>
      {!!useAllInstances().length && (
        <>
          <ButtonOutline
            className="btn-error w-60"
            onClick={() => {
              setInstances([]);
            }}
          >
            Clear instances
          </ButtonOutline>
          <Link to={path.CHART}>
            <ButtonOutline className="btn-info w-60">Instance</ButtonOutline>
          </Link>
        </>
      )}
    </Layout>
  );
};
