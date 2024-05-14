import React from 'react';
import { useMenuContext } from 'src/context';
import { InstanceProps } from 'src/utils';

import { Footer } from './Footer';
import { Menu } from './Menu';
import { Navbar } from './Navbar';

export const Layout: React.FC<React.PropsWithChildren & InstanceProps> = ({
  children,
  ...rest
}) => {
  const { isMenu, toggle } = useMenuContext();

  return (
    <div className="flex flex-1">
      {isMenu && <Menu />}
      <main className="flex flex-col">
        <Navbar menuClick={toggle} {...rest} />
        <div className="flex flex-col justify-center items-center flex-1 gap-8">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
};
