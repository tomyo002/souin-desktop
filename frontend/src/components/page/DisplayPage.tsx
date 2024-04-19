import React from 'react';

import { Navbar, Footer } from '../layout';
import { Display, DisplayQuantile } from '../molecule';

type PropsDisplayPage = {
  baseUrl: string;
  name: string;
};

export const DisplayPage: React.FC<PropsDisplayPage> = ({ baseUrl, name }) => (
  <>
    <Navbar baseUrl={baseUrl} name={name} />
    <div className="flex flex-row gap-8 justify-center flex-1">
      <div className="flex flex-col justify-center gap-8">
        <Display
          baseUrl={baseUrl}
          name="process_resident_memory_bytes"
          timeMilliSecond={1000}
          title="Octets de la mémoire résidente"
        />
        <Display
          baseUrl={baseUrl}
          name="process_virtual_memory_bytes"
          timeMilliSecond={1000}
          title="Octets de la mémoire virtuelle"
        />
      </div>
      <div className="flex flex-col justify-center">
        <DisplayQuantile
          baseUrl={baseUrl}
          name="go_gc_duration_seconds"
          timeMilliSecond={5000}
          title="Go gc durée par secondes"
        />
      </div>
    </div>
    <Footer />
  </>
);
