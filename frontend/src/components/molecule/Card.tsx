import React from 'react';

import { H2 } from '../atomic';
import { ClassName } from '../global';

type CardProps = ClassName &
  React.PropsWithChildren & {
    title: string;
  };

export const Card: React.FC<CardProps> = ({ className, title, children }) => (
  <div className={`card w-96 bg-primary-content ${className}`}>
    <div className="card-body">
      <H2 className="card-title" content={title} />
      {children}
    </div>
  </div>
);
