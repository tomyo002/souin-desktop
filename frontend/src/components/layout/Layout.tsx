import React from 'react';
import { InstanceProps } from 'src/utils';

import { Footer } from './Footer';
import { Menu } from './Menu';
import { Navbar } from './Navbar';

export const Layout: React.FC<React.PropsWithChildren & InstanceProps> = ({
  children,
  ...rest
}) => (
  <div className="flex flex-1">
    <main className="flex flex-col">
      <div className="drawer flex flex-1 flex-col">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content flex flex-col flex-1">
          <Navbar {...rest} />
          <div className="flex flex-col justify-center items-center flex-1 gap-8">
            {children}
          </div>
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
      <Footer />
    </main>
  </div>
);
