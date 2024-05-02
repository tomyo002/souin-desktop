import React, { useEffect, useState } from 'react';
import { fetchData } from 'src/service/fetcher';
import { dataType } from 'src/utils';

import { Navbar, Footer } from '../layout';
import { MultiLineData } from '../molecule';

export const ChartPage: React.FC = () => {
  const [data, setData] = useState<Record<dataType, string>>();
  useEffect(() => {
    fetchData().then(({ formData }) => {
      setData(formData);
    });
  }, []);

  return data ? (
    <main>
      <Navbar baseUrl={data.baseUrl} name={data.name} />
      <div className="grid grid-cols-2 gap-8">
        <MultiLineData
          authentication={data.authentication}
          baseUrl={data.baseUrl}
          labels={['process_resident_memory_bytes']}
          max={20}
          title="Process resident memory bytes"
        />
        <MultiLineData
          authentication={data.authentication}
          baseUrl={data.baseUrl}
          labels={[
            'go_memstats_heap_sys_bytes',
            'go_memstats_heap_released_bytes',
            'go_memstats_heap_alloc_bytes',
          ]}
          max={20}
          title="Heap memory"
        />
        <MultiLineData
          authentication={data.authentication}
          baseUrl={data.baseUrl}
          labels={[
            'go_memstats_mcache_sys_bytes',
            'go_memstats_mcache_inuse_bytes',
          ]}
          max={20}
          title="Off-heap memory"
        />
        <MultiLineData
          authentication={data.authentication}
          baseUrl={data.baseUrl}
          labels={['process_cpu_seconds_total', 'process_open_fds']}
          max={20}
          title="Process"
        />
      </div>
      <Footer />
    </main>
  ) : undefined;
};
