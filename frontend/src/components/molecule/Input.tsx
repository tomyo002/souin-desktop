import React from 'react';
import { ClassName } from 'src/utils';

import { AllowedIcon, Icon } from '../atomic/Icon';

type InputProps = ClassName & {
  icon: AllowedIcon;
} & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;

export const Input: React.FC<InputProps> = ({ className, icon, ...rest }) => (
  <label
    className={`input input-bordered flex items-center gap-2 ${className}`}
  >
    <Icon name={icon} />
    <input {...rest} />
  </label>
);
