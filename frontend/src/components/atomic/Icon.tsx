import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Bars3Icon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  CodeBracketSquareIcon,
  Cog6ToothIcon,
  KeyIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  ServerIcon,
  TrashIcon,
  UserIcon,
  XCircleIcon,
  XMarkIcon,
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
  | 'cross'
  | 'user'
  | 'key'
  | 'server'
  | 'input.name'
  | 'chevron-down'
  | 'plus'
  | 'minus'
  | 'menu'
  | 'input.header';

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
    case 'cross':
      return XMarkIcon;
    case 'user':
      return UserIcon;
    case 'key':
      return KeyIcon;
    case 'server':
      return ServerIcon;
    case 'input.name':
      return ChatBubbleLeftIcon;
    case 'chevron-down':
      return ChevronDownIcon;
    case 'plus':
      return PlusCircleIcon;
    case 'minus':
      return MinusCircleIcon;
    case 'menu':
      return Bars3Icon;
    case 'input.header':
      return CodeBracketSquareIcon;
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
  return <Icon className={className ?? 'h-6 w-6'} />;
};
