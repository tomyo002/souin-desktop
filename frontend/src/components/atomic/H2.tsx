import React from 'react';
import { ClassName } from '../global';

type H2Props = ClassName & {
  content: string;
};

export const H2: React.FC<H2Props> = ({ className, content }) => (
  <h2 className={`prose prose-xl ${className}`}>{content}</h2>
);
