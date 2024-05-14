import React, { FormEvent, useState } from 'react';
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

const createInstance = (form: HTMLFormElement, isAuthenticated: boolean) => {
  const elements = getFormElements(
    form,
    'name',
    'baseUrl',
    'login',
    'password',
  );
  const instance: InstanceType = {
    name: elements['name'],
    baseUrl: elements['baseUrl'],
  };
  if (isAuthenticated) {
    return {
      ...instance,
      authentication: btoa(`${elements['login']}:${elements['password']}`),
    };
  }
  return instance;
};

export const InstanceForm: React.FC = () => {
  const navigate = useNavigate();
  const { instances, setInstances } = useInstances();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInstances([
      ...instances,
      createInstance(event.target as HTMLFormElement, isAuthenticated),
    ]);
    navigate(path.HOME);
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
          }}
          type="checkbox"
        />
      </div>
      <form className="flex flex-col gap-8" onSubmit={submit}>
        <Input icon="input.name" id="name" placeholder="Name" type="text" />
        <Input icon="server" id="baseUrl" placeholder="Base url" type="text" />
        {isAuthenticated && (
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
        <button className="btn btn-outline btn-success" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
