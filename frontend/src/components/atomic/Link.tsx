import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ClassName } from 'src/utils';

type PropsLink = ClassName & {
  to: string;
  children: ReactNode;
};

export const Link: React.FC<PropsLink> = ({ to, ...rest }) => (
  <RouterLink to={to} {...rest} />
);
