import React from 'react';
import { Link } from 'react-router-dom';
import { InstanceProps, path } from 'src/utils';

import { Button, Icon } from '../atomic';
import { HealthCheck } from '../molecule';
type NavbarProps = InstanceProps & {
  menuClick: () => void;
};
export const Navbar: React.FC<NavbarProps> = ({ name, baseUrl, menuClick }) => (
  <div className="navbar bg-neutral text-neutral-content">
    <div className="flex-1">
      <Button className="btn-ghost" onClick={menuClick}>
        <Icon name="menu" />
      </Button>
      <Link to={path.HOME}>
        <span className="btn btn-ghost text-xl">
          {name && baseUrl ? `${name}: ${baseUrl}` : 'souin desktop'}
        </span>
      </Link>
    </div>
    <div>{baseUrl && <HealthCheck baseUrl={baseUrl} />}</div>
  </div>
);
