import React from 'react';
import { Link } from 'react-router-dom';
import { InstanceProps, path } from 'src/utils';

import { ButtonOutline, Icon } from '../atomic';
import { HealthCheck } from '../molecule';

export const Navbar: React.FC<InstanceProps> = ({ name, baseUrl }) => (
  <div className="navbar bg-neutral text-neutral-content">
    <label className="btn btn-ghost drawer-button" htmlFor="my-drawer">
      <Icon name="menu" />
    </label>
    <div className="flex-1">
      <Link to={path.HOME}>
        <span className="btn btn-ghost text-xl">
          {name && baseUrl ? `${name}: ${baseUrl}` : 'souin desktop'}
        </span>
      </Link>
    </div>
    <div>
      {baseUrl && (
        <div className="flex items-center gap-8">
          <Link to={path.FORM_CHART}>
            <ButtonOutline className="btn-success">New chart</ButtonOutline>
          </Link>
          <HealthCheck baseUrl={baseUrl} />
        </div>
      )}
    </div>
  </div>
);
