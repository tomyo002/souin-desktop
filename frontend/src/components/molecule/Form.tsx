import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { H1 } from '../atomic';

import { Input, InputProps } from '.';

type FormProps = React.PropsWithChildren & {
  inputs: ReadonlyArray<InputProps>;
  submit: (event: FormEvent<HTMLFormElement>) => void;
  route: string;
  title: string;
};

export const Form: React.FC<FormProps> = ({
  inputs,
  submit,
  route,
  title,
  children,
}) => {
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    submit(event);
    navigate(route);
  };

  return (
    <div className="flex flex-col gap-8">
      <H1 className="text-center" content={title} />
      {children}
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        {inputs.map(({ icon, id, ...rest }) => (
          <div key={id}>
            <Input icon={icon} id={id} {...rest} />
          </div>
        ))}
        <button className="btn btn-outline btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
