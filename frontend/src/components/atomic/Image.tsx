import React from 'react';

type PropsImage = {
  classname?: string;
  src: string;
};

export const Image: React.FC<PropsImage> = ({ classname, ...rest }) => (
  <img className={classname} {...rest} />
);
