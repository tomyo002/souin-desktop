import React from 'react';

import { Connected } from '../molecule';

type NavbarProps = {
  name: string;
  baseUrl: string;
};

export const Navbar: React.FC<NavbarProps> = ({ name, baseUrl }) => (
  <div className="navbar bg-neutral text-neutral-content">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">
        {name}: {baseUrl}
      </a>
    </div>
    <div className="flex-none">
      <Connected baseUrl={baseUrl} />
    </div>
  </div>
);
