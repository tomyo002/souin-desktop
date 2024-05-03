import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  KeyIcon,
  ServerIcon,
  TrashIcon,
  UserIcon,
  XCircleIcon,
} from '@heroicons/react/16/solid';
import React, { ComponentType } from 'react';
import { ClassName } from 'src/utils';

export type AllowedIcon =
  | 'arrow-left'
  | 'arrow-right'
  | 'trash'
  | 'settings'
  | 'check-circle'
  | 'x-circle'
  | 'user'
  | 'key'
  | 'server'
  | 'chat'
  | 'chevron-down';

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
    case 'check-circle':
      return CheckCircleIcon;
    case 'x-circle':
      return XCircleIcon;
    case 'user':
      return UserIcon;
    case 'key':
      return KeyIcon;
    case 'server':
      return ServerIcon;
    case 'chat':
      return ChatBubbleLeftIcon;
    case 'chevron-down':
      return ChevronDownIcon;
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
