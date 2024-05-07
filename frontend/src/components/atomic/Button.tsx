import React from 'react';
import { ClassName } from 'src/utils';

type ButtonProps = ClassName &
  React.PropsWithChildren & {
    onClick?: (params?: unknown) => void;
  };

export const Button: React.FC<ButtonProps> = ({ className, ...rest }) => (
  <button className={`btn ${className}`} type="button" {...rest} />
);

export const ButtonOutline: React.FC<ButtonProps> = ({
  className,
  ...rest
}) => <Button className={`btn-outline ${className}`} {...rest} />;
