import React from 'react';

import { Link, Icon } from '../atomic';
import { HealthCheck } from '../molecule';

type NavbarProps = {
  name?: string;
  baseUrl?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ name, baseUrl }) => (
  <div className="navbar bg-neutral text-neutral-content">
    <div className="flex-1">
      <Link to="/">
        <span className="btn btn-ghost text-xl">
          {name ? `${name}: ${baseUrl}` : `souin desktop`}
          <Icon name="chevron-down" />
        </span>
      </Link>
    </div>
    <div>{baseUrl ? <HealthCheck baseUrl={baseUrl} /> : undefined}</div>
  </div>
);
