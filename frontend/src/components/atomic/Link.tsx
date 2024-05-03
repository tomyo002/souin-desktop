import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ClassName } from 'src/utils';

type LinkProps = ClassName &
  React.PropsWithChildren & {
    to: string;
  };

export const Link: React.FC<LinkProps> = ({ ...props }) => (
  <RouterLink {...props} />
);
