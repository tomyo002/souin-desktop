import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from 'src/service/fetcher';
import { dataType } from 'src/utils';

import { Icon } from '../atomic';

export const AuthenticationForm: React.FC = () => {
  const [data, setData] = useState<Record<dataType, string>>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData().then(({ formData }) => {
      setData(formData);
    });
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      baseUrl: (form.elements.namedItem('baseUrl') as HTMLInputElement).value,
      login: (form.elements.namedItem('login') as HTMLInputElement).value,
      authentication: btoa(
        `${(form.elements.namedItem('login') as HTMLInputElement).value}:${(form.elements.namedItem('password') as HTMLInputElement).value}`,
      ),
    };
    await fetch('http://localhost:5000/api/saveFormData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      navigate(`/`);
    });
  };

  return (
    <main>
      <form onSubmit={submit}>
        <label className="input input-bordered flex items-center gap-2">
          <Icon name="chat-buble-left" />
          <input id="name" placeholder="Name" type="text" value={data?.name} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <Icon name="server" />
          <input
            id="baseUrl"
            placeholder="Base url"
            type="text"
            value={data?.baseUrl}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <Icon name="user" />
          <input
            id="login"
            placeholder="Login"
            type="text"
            value={data?.login}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <Icon name="key" />
          <input id="password" placeholder="Password" type="password" />
        </label>
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </main>
  );
};
