import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Cog6ToothIcon,
  TrashIcon,
} from '@heroicons/react/16/solid';
import React, { ComponentType } from 'react';
import { ClassName } from '../global';

import { ClassName } from '../global';

export type AllowedIcon = 'arrow-left' | 'arrow-right' | 'trash' | 'settings';

function mapIcon(
  name: AllowedIcon,
): ComponentType<React.SVGProps<SVGSVGElement>> | undefined {
  switch (name) {
    case 'arrow-left':
      return ArrowLeftIcon;
    case 'arrow-right':
      return ArrowRightIcon;
    case 'trash':
      return TrashIcon;
    case 'settings':
      return Cog6ToothIcon;
    default:
      return Cog6ToothIcon;
  }
}

type IconProps = ClassName & {
  name: AllowedIcon;
};

export const Icon: React.FC<IconProps> = ({ className, name }) => {
  const Icon = mapIcon(name);
  if (!Icon) {
    return null;
  }
  return <Icon className={`h-6 w-6 ${className}`} />;
};
