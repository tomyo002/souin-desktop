import React from 'react';

import { ClassName } from '../global';

import { ClassName } from '../global';

type ImageProps = ClassName & {
  src: string;
};

export const Image: React.FC<ImageProps> = ({ ...props }) => <img {...props} />;
