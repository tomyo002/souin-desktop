import React from 'react';
import { ClassName } from 'src/utils';

import { AllowedIcon, Icon } from '../atomic/Icon';

type LabelProps = ClassName &
  React.PropsWithChildren & {
    icon: AllowedIcon;
  };

export const Label: React.FC<LabelProps> = ({ className, children, icon }) => (
  <label
    className={`input input-bordered flex items-center gap-2 ${className}`}
  >
    <Icon name={icon} />
    {children}
  </label>
);
