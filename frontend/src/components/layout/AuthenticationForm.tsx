import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthentication } from 'src/service';

import { H1, Icon } from '../atomic';

export const AuthenticationForm: React.FC = () => {
  const navigate = useNavigate();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
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
        <label className="input input-bordered flex items-center gap-2">
          <Icon name="chat-buble-left" />
          <input id="name" placeholder="Name" type="text" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <Icon name="server" />
          <input id="baseUrl" placeholder="Base url" type="text" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <Icon name="user" />
          <input id="login" placeholder="Login" type="text" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <Icon name="key" />
          <input id="password" placeholder="Password" type="password" />
        </label>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};
