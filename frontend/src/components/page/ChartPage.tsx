import React from 'react';

import { Navbar, Footer } from '../layout';
import { MultiLineData } from '../molecule';

type DisplayPageProps = {
  baseUrl: string;
  name: string;
};

export const ChartPage: React.FC<DisplayPageProps> = ({ baseUrl, name }) => (
  <main>
    <Navbar baseUrl={baseUrl} name={name} />
    <div className="grid grid-cols-2 gap-8">
      <MultiLineData
        baseUrl={baseUrl}
        labels={['process_resident_memory_bytes']}
        max={20}
        title="Process resident memory bytes"
      />
      <MultiLineData
        baseUrl={baseUrl}
        labels={[
          'go_memstats_heap_sys_bytes',
          'go_memstats_heap_released_bytes',
          'go_memstats_heap_alloc_bytes',
        ]}
        max={20}
        title="Heap memory"
      />
      <MultiLineData
        baseUrl={baseUrl}
        labels={[
          'go_memstats_mcache_sys_bytes',
          'go_memstats_mcache_inuse_bytes',
        ]}
        max={20}
        title="Off-heap memory"
      />
      <MultiLineData
        baseUrl={baseUrl}
        labels={['process_cpu_seconds_total', 'process_open_fds']}
        max={20}
        title="Process"
      />
    </div>
    <Footer />
  </main>
);
