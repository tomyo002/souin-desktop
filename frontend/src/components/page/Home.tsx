import React from 'react';

import { Button, H1, Link } from '../atomic';
import { Navbar, Footer } from '../layout';

export const Home: React.FC = () => (
  <>
    <Navbar />
    <div className="flex flex-1 flex-col justify-center items-center gap-8">
      <H1 content="Welcome on Souin Desktop" />
      <Link to="/form">
        <Button className="btn-outline btn-accent">New instance</Button>
      </Link>
      <Link to="/chart">
        <Button className="btn-outline btn-info">Instance</Button>
      </Link>
    </div>
    <Footer />
  </>
);
