import React from 'react';

import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className="flex flex-col">
    <Navbar />
    <div className="flex flex-col justify-center items-center flex-1 gap-8">
      {children}
    </div>
    <Footer />
  </main>
);
