import React, { createContext, useEffect, useState } from 'react';
import { ChartType } from 'src/utils';

import { useStorage } from './StorageProvider';

type chartContextProps = {
  charts: ReadonlyArray<ChartType>;
  setCharts: (newCharts: ReadonlyArray<ChartType>) => void;
};

export const ChartContext = createContext<chartContextProps>({
  charts: [],
  setCharts: (newCharts: ReadonlyArray<ChartType>) => {
    console.log(newCharts);
  },
});

export const ChartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [charts, setCharts] = useState<ReadonlyArray<ChartType>>([]);
  const storage = useStorage();

  const updateCharts = (newCharts: ReadonlyArray<ChartType>) => {
    setCharts(newCharts);
    storage.setCharts(newCharts);
  };

  useEffect(() => {
    storage.getCharts().then(allCharts => {
      setCharts(allCharts);
    });
  }, [storage]);

  return (
    <ChartContext.Provider
      value={{
        charts,
        setCharts: updateCharts,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
