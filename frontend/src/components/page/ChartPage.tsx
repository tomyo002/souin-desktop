import React from 'react';
import { useCurrentInstance } from 'src/context';

import { Layout } from '../layout';
import { MultiLineData } from '../molecule';

export const ChartPage: React.FC = () => {
  const instance = useCurrentInstance();
  return (
    <Layout baseUrl={instance.baseUrl} name={instance.name}>
      <div className="grid grid-cols-2 gap-8">
        <MultiLineData
          labels={['process_resident_memory_bytes']}
          max={20}
          title="Process resident memory bytes"
        />
        <MultiLineData
          labels={[
            'go_memstats_heap_sys_bytes',
            'go_memstats_heap_released_bytes',
            'go_memstats_heap_alloc_bytes',
          ]}
          max={20}
          title="Heap memory"
        />
        <MultiLineData
          labels={[
            'go_memstats_mcache_sys_bytes',
            'go_memstats_mcache_inuse_bytes',
          ]}
          max={20}
          title="Off-heap memory"
        />
        <MultiLineData
          labels={['process_cpu_seconds_total', 'process_open_fds']}
          max={20}
          title="Process"
        />
      </div>
    </Layout>
  );
};
