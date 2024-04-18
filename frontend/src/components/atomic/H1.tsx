import React from 'react';
import { ClassName } from '../global';

import { ClassName } from '../global';

type H1Props = ClassName & {
  content: string;
};

export const H1: React.FC<H1Props> = ({ className, content }) => (
  <h1 className={`prose prose-2xl ${className}`}>{content}</h1>
);
