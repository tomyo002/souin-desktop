import React from 'react';

import { AuthenticationForm, Footer, Navbar } from '../layout';

export const FormPage: React.FC = () => (
  <main className="flex flex-col">
    <Navbar />
    <div className="flex flex-col justify-center items-center flex-1">
      <div>
        <AuthenticationForm />
      </div>
    </div>
    <Footer />
  </main>
);
