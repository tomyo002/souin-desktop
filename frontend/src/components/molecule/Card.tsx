import React from 'react';
import { ClassName } from 'src/utils';

import { H2 } from '../atomic';

type CardProps = ClassName &
  React.PropsWithChildren & {
    title: string;
  };

export const Card: React.FC<CardProps> = ({ className, title, children }) => (
  <div className={`rounded-2xl bg-neutral/5 ${className}`}>
    <div className="card-body">
      <H2 className="card-title" content={title} />
      {children}
    </div>
  </div>
);
