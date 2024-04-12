import React from 'react';

type PropsH2 = {
  classname?: string;
  content: string;
};

export const H2: React.FC<PropsH2> = ({ classname, content }) => (
  <h2 className={`prose prose-xl ${classname}`}>{content}</h2>
);
