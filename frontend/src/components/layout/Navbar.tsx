import React from 'react';
import { Link } from 'react-router-dom';
import { InstanceProps, path } from 'src/utils';

import { HealthCheck } from '../molecule';

export const Navbar: React.FC<InstanceProps> = ({ name, baseUrl }) => (
  <div className="navbar bg-neutral text-neutral-content">
    <div className="flex-1">
      <Link to={path.HOME}>
        <span className="btn btn-ghost text-xl">
          {name && baseUrl ? `${name}: ${baseUrl}` : 'souin desktop'}
        </span>
      </Link>
    </div>
    <div>{baseUrl && <HealthCheck baseUrl={baseUrl} />}</div>
  </div>
);
