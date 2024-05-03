import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setInstance } from 'src/service';
import { Home, InstanceType } from 'src/utils';

import { H1 } from '../atomic';
import { Label } from '../molecule';

export const InstanceForm: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const instance: InstanceType = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      baseUrl: (form.elements.namedItem('baseUrl') as HTMLInputElement).value,
    };
    if (isAuthenticated) {
      instance.authentication = btoa(
        `${(form.elements.namedItem('login') as HTMLInputElement).value}:${(form.elements.namedItem('password') as HTMLInputElement).value}`,
      );
    }

    setInstance(instance);
    navigate(Home);
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
        <Label icon="input.name">
          <input id="name" placeholder="Name" type="text" />
        </Label>
        <Label icon="server">
          <input id="baseUrl" placeholder="Base url" type="text" />
        </Label>
        {isAuthenticated && (
          <>
            <Label icon="user">
              <input id="login" placeholder="Login" type="text" />
            </Label>
            <Label icon="key">
              <input id="password" placeholder="Password" type="password" />
            </Label>
          </>
        )}
        <button className="btn btn-outline btn-success" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
