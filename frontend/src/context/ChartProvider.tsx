import React, { createContext, useState } from 'react';
import { ChartType } from 'src/utils';

type chartContextProps = {
  charts: ReadonlyArray<ChartType>;
  setCharts: (newCharts: ReadonlyArray<ChartType>) => void;
};

const initialChart: ReadonlyArray<ChartType> = [
  {
    title: 'Process resident memory bytes',
    labels: ['process_resident_memory_bytes'],
    max: 20,
  },
  {
    title: 'Heap memory',
    labels: [
      'go_memstats_heap_sys_bytes',
      'go_memstats_heap_released_bytes',
      'go_memstats_heap_alloc_bytes',
    ],
    max: 20,
  },
  {
    title: 'Off-heap memory',
    labels: ['go_memstats_mcache_sys_bytes', 'go_memstats_mcache_inuse_bytes'],
    max: 20,
  },
  {
    title: 'Process',
    labels: ['process_cpu_seconds_total', 'process_open_fds'],
    max: 20,
  },
];

export const ChartContext = createContext<chartContextProps>({
  charts: initialChart,
  setCharts: (newCharts: ReadonlyArray<ChartType>) => {
    console.log(newCharts);
  },
});

export const ChartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [charts, setCharts] = useState<ReadonlyArray<ChartType>>(initialChart);

  return (
    <ChartContext.Provider
      value={{
        charts,
        setCharts,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
