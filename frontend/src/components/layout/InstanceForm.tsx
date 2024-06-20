import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useInstances } from 'src/context';
import {
  path,
  InstanceType,
  allowedAuthType,
  getFormElements,
} from 'src/utils';

import { Form, InputProps } from '../molecule';

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
    name: elements.name,
    baseUrl: elements.baseUrl,
  };

  if (isAuthenticated) {
    let token: string = '';
    switch (authType) {
      case 'apikey':
      case 'jwt':
        token = elements[authType];
        break;
      case 'basicauth':
        token = btoa(`${elements.login}:${elements.password}`);
        break;
    }

    return {
      ...instance,
      authentication: {
        type: authType,
        token,
        ...(authType === 'apikey' && { header: elements.header }),
      },
    } as InstanceType;
  }
  return instance;
};

export const InstanceForm: React.FC = () => {
  const { instances, setInstances } = useInstances();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authType, setAuthType] = useState<allowedAuthType>('basicauth');
  const [authentication, setAuthentication] = useState<
    ReadonlyArray<InputProps>
  >([]);

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
  };

  useEffect(() => {
    setAuthentication([]);
    if (isAuthenticated) {
      switch (authType) {
        case 'basicauth':
          setAuthentication([
            {
              icon: 'user',
              id: 'login',
              placeholder: 'Login',
              type: 'text',
            },
            {
              icon: 'key',
              id: 'password',
              placeholder: 'Password',
              type: 'password',
            },
          ]);
          break;
        case 'apikey':
          setAuthentication([
            {
              icon: 'input.header',
              id: 'header',
              placeholder: 'Header',
              type: 'text',
            },
            {
              icon: 'key',
              id: 'apikey',
              placeholder: 'API Key',
              type: 'text',
            },
          ]);
          break;
        case 'jwt':
          setAuthentication([
            {
              icon: 'key',
              id: 'jwt',
              placeholder: 'JWT Token',
              type: 'text',
            },
          ]);
          break;
      }
    }
  }, [isAuthenticated, authType]);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAuthType(event.target.value as allowedAuthType);
  };

  return (
    <Form
      inputs={[
        {
          icon: 'input.name',
          id: 'name',
          placeholder: 'Name',
          type: 'text',
        },
        {
          icon: 'server',
          id: 'baseUrl',
          placeholder: 'Base url',
          type: 'text',
        },
        ...authentication,
      ]}
      route={path.HOME}
      submit={submit}
      title="Instance"
    >
      <div className="flex justify-center gap-8">
        <span>Authentication</span>
        <input
          className="toggle"
          onClick={() => {
            setIsAuthenticated(!isAuthenticated);
          }}
          type="checkbox"
        />
      </div>
      {isAuthenticated && (
        <>
          <select
            className="select select-bordered w-full max-w-xs"
            id="type-authentication"
            onChange={onChange}
            value={authType}
          >
            <option value="basicauth">Basic auth</option>
            <option value="apikey">API Key</option>
            <option value="jwt">JSON Web Token</option>
          </select>
        </>
      )}
    </Form>
  );
};
