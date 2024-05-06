import React from 'react';
import { InstanceProps } from 'src/utils';

import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Layout: React.FC<React.PropsWithChildren & InstanceProps> = ({
  children,
  baseUrl,
  name,
}) => (
  <main className="flex flex-col">
    <Navbar baseUrl={baseUrl} name={name} />
    <div className="flex flex-col justify-center items-center flex-1 gap-8">
      {children}
    </div>
    <Footer />
  </main>
);
