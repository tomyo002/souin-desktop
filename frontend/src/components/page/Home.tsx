import React from 'react';

import { Button, H1, Link } from '../atomic';
import { Navbar, Footer } from '../layout';

export const Home: React.FC = () => (
  <>
    <Navbar />
    <div className="flex flex-1 flex-col justify-center items-center">
      <H1 content="Welcome on Souin Desktop" />
      <Link to="/form">
        <Button>New instance</Button>
      </Link>
      <Link to="/chart">
        <Button>Instance</Button>
      </Link>
    </div>
    <Footer />
  </>
);
