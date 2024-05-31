import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  useAllInstances,
  useSelectStorage,
  useSetInstances,
} from 'src/context';
import { AllowedStorage, LOCAL, SQLITE, path } from 'src/utils';

import { ButtonOutline, H1 } from '../atomic';
import { Layout } from '../layout';

const isAllowStorage = (value: string): value is AllowedStorage => {
  return value === LOCAL || value === SQLITE;
};

export const HomePage: React.FC = () => {
  const setInstances = useSetInstances();
  const { storage, setStorage } = useSelectStorage();
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (isAllowStorage(event.target.value)) {
      setStorage(event.target.value);
    }
  };

  return (
    <Layout>
      <H1 content="Welcome on Souin Desktop" />
      <div className="flex flex-col gap-8 w-60">
        <select
          className="select select-bordered w-full"
          onChange={onChange}
          value={storage.getName()}
        >
          <option value={LOCAL}>Local</option>
          <option value={SQLITE}>Sqlite</option>
        </select>
        <Link to={path.FORM}>
          <ButtonOutline className="btn-accent w-full">
            New instance
          </ButtonOutline>
        </Link>
        {!!useAllInstances().length && (
          <>
            <ButtonOutline
              className="btn-error w-full"
              onClick={() => setInstances([])}
            >
              Clear instances
            </ButtonOutline>
            <Link to={path.CHART}>
              <ButtonOutline className="btn-info w-full">
                Instance
              </ButtonOutline>
            </Link>
          </>
        )}
      </div>
    </Layout>
  );
};
