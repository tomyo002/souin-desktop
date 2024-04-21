import React from 'react';
import { HealthCheck } from 'src/components/molecule';

type PropsNavbar = {
  name: string;
  baseUrl: string;
};

export const Navbar: React.FC<PropsNavbar> = ({ name, baseUrl }) => (
  <div className="navbar bg-neutral text-base-100 flex">
    <a className="text-lg mr-auto">
      {name}: {baseUrl}
    </a>
    <HealthCheck baseUrl={baseUrl} />
  </div>
);
