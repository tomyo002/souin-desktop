import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInstances } from 'src/context';
import { path, InstanceType } from 'src/utils';

import { H1 } from '../atomic';
import { Input } from '../molecule';

const defaultArrayFormElements: Record<string, string> = {};
const getFormElements = (
  form: HTMLFormElement,
  ...names: ReadonlyArray<string>
) => {
  return names.reduce((acc, current) => {
    acc[current] = (
      form.elements.namedItem(current) as HTMLInputElement
    )?.value;
    return acc;
  }, defaultArrayFormElements);
};

const createInstance = (
  form: HTMLFormElement,
  isAuthenticated: boolean,
  typeAuth: string,
) => {
  const elements = getFormElements(
    form,
    'name',
    'baseUrl',
    'login',
    'password',
    'apikey',
    'jwt',
    'header',
  );
  const instance: InstanceType = {
    name: elements['name'],
    baseUrl: elements['baseUrl'],
  };

  if (isAuthenticated) {
    const token: string =
      typeAuth === 'apikey'
        ? elements['apikey']
        : typeAuth === 'JWT'
          ? elements['jwt']
          : btoa(`${elements['login']}:${elements['password']}`);
    const header: string =
      typeAuth === 'apikey' ? elements['header'] : 'Authorization';

    return {
      ...instance,
      authentication: { type: typeAuth, token, header },
    };
  }
  return instance;
};

export const InstanceForm: React.FC = () => {
  const navigate = useNavigate();
  const { instances, setInstances } = useInstances();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [typeAuth, setTypeAuth] = useState('basicauth');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInstances([
      ...instances,
      createInstance(
        event.target as HTMLFormElement,
        isAuthenticated,
        typeAuth,
      ),
    ]);
    navigate(path.HOME);
  };

  const Change = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const form = event.target as HTMLSelectElement;
    setTypeAuth(form.value);
  };

  return (
    <>
      <H1 className="text-center" content="Instance" />
      <div className="flex gap-8">
        <span>Authentication</span>
        <input
          className="toggle"
          onClick={() => {
            setIsAuthenticated(!isAuthenticated);
            setTypeAuth('basicauth');
          }}
          type="checkbox"
        />
      </div>
      <form className="flex flex-col gap-8" onSubmit={submit}>
        <Input icon="input.name" id="name" placeholder="Name" type="text" />
        <Input icon="server" id="baseUrl" placeholder="Base url" type="text" />
        {isAuthenticated && (
          <>
            <select
              className="select select-bordered w-full max-w-xs"
              id="type-authentication"
              onChange={Change}
            >
              <option value="basicauth">Basic auth</option>
              <option value="apikey">API Key</option>
              <option value="JWT">JSON Web Token</option>
            </select>
            {typeAuth === 'basicauth' ? (
              <>
                <Input icon="user" id="login" placeholder="Login" type="text" />
                <Input
                  icon="key"
                  id="password"
                  placeholder="Password"
                  type="password"
                />
              </>
            ) : typeAuth === 'apikey' ? (
              <>
                <Input
                  icon="input.header"
                  id="header"
                  placeholder="Header"
                  type="text"
                />
                <Input
                  icon="key"
                  id="apikey"
                  placeholder="API Key"
                  type="text"
                />
              </>
            ) : (
              typeAuth === 'JWT' && (
                <Input
                  icon="key"
                  id="jwt"
                  placeholder="JWT Token"
                  type="text"
                />
              )
            )}
          </>
        )}
        <button className="btn btn-outline btn-success" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
