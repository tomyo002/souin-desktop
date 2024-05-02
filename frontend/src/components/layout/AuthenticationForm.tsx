import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthentication } from 'src/service';

import { H1, Icon } from '../atomic';

export const AuthenticationForm: React.FC = () => {
  const navigate = useNavigate();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const baseUrl = formData.get('baseUrl') as string;
    const login = formData.get('login') as string;
    const password = formData.get('password') as string;
    const authentication = btoa(`${login}:${password}`);
    setAuthentication({ name, baseUrl, authentication });
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
