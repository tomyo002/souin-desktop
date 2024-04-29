import React from 'react';

import { HealthCheck } from '../molecule';

type NavbarProps = {
  name: string;
  baseUrl: string;
};

export const Navbar: React.FC<NavbarProps> = ({ name, baseUrl }) => (
  <div className="navbar bg-neutral text-neutral-content">
    <div className="flex-1">
      <span className="btn btn-ghost text-xl">
        {name}: {baseUrl}
      </span>
    </div>
    <div>
      <HealthCheck baseUrl={baseUrl} />
    </div>
  </div>
);
