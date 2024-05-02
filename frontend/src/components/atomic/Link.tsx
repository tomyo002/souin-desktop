import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type PropsLink = {
  className?: string;
  to: string;
  children: ReactNode;
};

export const Link: React.FC<PropsLink> = ({ to, ...rest }) => (
  <RouterLink to={to} {...rest} />
);
