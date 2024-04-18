import React from 'react';
import { ClassName } from '../global';

type ButtonProps = ClassName &
  React.PropsWithChildren & {
    onClick?: (params?: unknown) => void;
  };

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
}) => (
  <button className={`btn ${className}`} onClick={onClick} type="button">
    {children}
  </button>
);
