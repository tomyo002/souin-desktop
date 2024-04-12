import React, { ReactNode } from 'react';

type PropsButton = {
  children: ReactNode;
  classname?: string;
  onclick?: (params?: unknown) => void;
};

export const Button: React.FC<PropsButton> = ({
  children,
  classname,
  onclick,
}) => (
  <button className={`btn ${classname}`} onClick={onclick} type="button">
    {children}
  </button>
);
