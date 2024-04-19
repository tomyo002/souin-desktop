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
          title="process resident memory bytes"
        />
        <Display
          baseUrl={baseUrl}
          name="process_virtual_memory_bytes"
          timeMilliSecond={1000}
          title="process virtual memory bytes"
        />
      </div>
      <div className="flex flex-col justify-center">
        <DisplayQuantile
          baseUrl={baseUrl}
          name="go_gc_duration_seconds"
          timeMilliSecond={5000}
          title="go gc duration seconds"
        />
      </div>
    </div>
    <Footer />
  </>
);
