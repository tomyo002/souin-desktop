import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInstances } from 'src/context';
import { path, InstanceType, allowedAuthType } from 'src/utils';

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
  authType: allowedAuthType,
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
    let token: string = '';
    switch (authType) {
      case 'apikey':
      case 'jwt':
        token = elements[authType];
        break;
      case 'basicauth':
        token = btoa(`${elements['login']}:${elements['password']}`);
        break;
    }

    return {
      ...instance,
      authentication: {
        type: authType,
        token,
        ...(authType === 'apikey' && { header: elements['header'] }),
      },
    } as InstanceType;
  }
  return instance;
};

export const InstanceForm: React.FC = () => {
  const navigate = useNavigate();
  const { instances, setInstances } = useInstances();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authType, setAuthType] = useState<allowedAuthType>('basicauth');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setInstances([
      ...instances,
      createInstance(
        event.target as HTMLFormElement,
        isAuthenticated,
        authType,
      ),
    ]);
    navigate(path.HOME);
  };

  const change = (event: ChangeEvent<HTMLSelectElement>) => {
    setAuthType(event.target.value as allowedAuthType);
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
            setAuthType('basicauth');
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
              onChange={change}
            >
              <option value="basicauth">Basic auth</option>
              <option value="apikey">API Key</option>
              <option value="jwt">JSON Web Token</option>
            </select>
            {authType === 'basicauth' && (
              <>
                <Input icon="user" id="login" placeholder="Login" type="text" />
                <Input
                  icon="key"
                  id="password"
                  placeholder="Password"
                  type="password"
                />
              </>
            )}
            {authType === 'apikey' && (
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
            )}
            {authType === 'jwt' && (
              <Input icon="key" id="jwt" placeholder="JWT Token" type="text" />
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
