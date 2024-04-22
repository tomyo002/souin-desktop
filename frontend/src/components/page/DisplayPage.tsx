import React from 'react';

import { Navbar, Footer } from '../layout';
import { Display } from '../molecule';

type DisplayPageProps = {
  baseUrl: string;
  name: string;
};

export const DisplayPage: React.FC<DisplayPageProps> = ({ baseUrl, name }) => (
  <>
    <Navbar baseUrl={baseUrl} name={name} />
    <div className="grid grid-cols-2 gap-8 flex flex-1">
      <Display
        baseUrl={baseUrl}
        labels={['process_resident_memory_bytes']}
        title="process resident memory bytes"
      />
      <Display
        baseUrl={baseUrl}
        labels={[
          'go_memstats_heap_released_bytes',
          'go_memstats_heap_sys_bytes',
          'go_memstats_heap_alloc_bytes',
          'go_memstats_heap_idle_bytes',
          'go_memstats_heap_inuse_bytes',
        ]}
        title="go memstats heap bytes"
      />
      <Display
        baseUrl={baseUrl}
        labels={[
          'process_virtual_memory_bytes',
          'process_virtual_memory_max_bytes',
        ]}
        title="process virtual memory bytes"
      />
    </div>
    <Footer />
  </>
);
