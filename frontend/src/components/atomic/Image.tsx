import React from 'react';
import { ClassName } from 'src/utils';

type ImageProps = ClassName & {
  src: string;
};

export const Image: React.FC<ImageProps> = ({ ...props }) => <img {...props} />;
