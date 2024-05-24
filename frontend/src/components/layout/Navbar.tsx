import React from 'react';
import { Link } from 'react-router-dom';
import { InstanceProps, path } from 'src/utils';

import { Icon } from '../atomic';
import { HealthCheck } from '../molecule';

import { Menu } from './Menu';

export const Navbar: React.FC<InstanceProps> = ({ name, baseUrl }) => (
  <div className="navbar bg-neutral text-neutral-content">
    <div className="drawer">
      <input className="drawer-toggle" id="my-drawer" type="checkbox" />
      <div className="drawer-content flex">
        <label className="btn btn-ghost drawer-button" htmlFor="my-drawer">
          <Icon name="menu" />
        </label>
        <Link to={path.HOME}>
          <span className="btn btn-ghost text-xl">
            {name && baseUrl ? `${name}: ${baseUrl}` : 'souin desktop'}
          </span>
        </Link>
      </div>
      <div className="drawer-side">
        <label
          aria-label="close sidebar"
          className="drawer-overlay"
          htmlFor="my-drawer"
        ></label>
        <Menu />
      </div>
    </div>
    <div>{baseUrl && <HealthCheck baseUrl={baseUrl} />}</div>
  </div>
);
