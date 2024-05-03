import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthentication } from 'src/service';

import { H1 } from '../atomic';
import { Label } from '../molecule';

export const AuthenticationForm: React.FC = () => {
  const navigate = useNavigate();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      baseUrl: (form.elements.namedItem('baseUrl') as HTMLInputElement).value,
      authentication: btoa(
        `${(form.elements.namedItem('login') as HTMLInputElement).value}:${(form.elements.namedItem('password') as HTMLInputElement).value}`,
      ),
    };
    setAuthentication(data);
    navigate('/');
  };

  return (
    <>
      <H1 className="text-center" content="Authentication" />
      <form className="flex flex-col gap-8" onSubmit={submit}>
        <Label icon="input.name">
          <input id="name" placeholder="Name" type="text" />
        </Label>
        <Label icon="server">
          <input id="baseUrl" placeholder="Base url" type="text" />
        </Label>
        <Label icon="user">
          <input id="login" placeholder="Login" type="text" />
        </Label>
        <Label icon="key">
          <input id="password" placeholder="Password" type="password" />
        </Label>
        <button className="btn btn-outline btn-success" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
