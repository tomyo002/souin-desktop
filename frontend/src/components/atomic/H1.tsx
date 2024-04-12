import React from 'react';

type PropsH1 = {
  classname?: string;
  content: string;
};

export const H1: React.FC<PropsH1> = ({ classname, content }) => (
  <h1 className={`prose prose-2xl ${classname}`}>{content}</h1>
);
