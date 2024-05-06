import React from 'react';
import { InstanceProps } from 'src/utils';

import { Footer } from './Footer';
import { Menu } from './Menu';
import { Navbar } from './Navbar';

export const Layout: React.FC<React.PropsWithChildren & InstanceProps> = ({
  children,
  baseUrl,
  name,
}) => (
  <div className="flex flex-1">
    <Menu />
    <main className="flex flex-col">
      <Navbar baseUrl={baseUrl} name={name} />
      <div className="flex flex-col justify-center items-center flex-1 gap-8">
        {children}
      </div>
      <Footer />
    </main>
  </div>
);
