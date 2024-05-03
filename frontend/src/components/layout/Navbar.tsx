import React from 'react';
import { Home } from 'src/utils';

import { Link } from '../atomic';
import { HealthCheck } from '../molecule';

type NavbarProps = {
  name?: string;
  baseUrl?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ name, baseUrl }) => (
  <div className="navbar bg-neutral text-neutral-content">
    <div className="flex-1">
      <Link to={Home}>
        <span className="btn btn-ghost text-xl">
          {name && baseUrl ? `${name}: ${baseUrl}` : 'souin desktop'}
        </span>
      </Link>
    </div>
    <div>{baseUrl ? <HealthCheck baseUrl={baseUrl} /> : undefined}</div>
  </div>
);
