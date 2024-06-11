import { AllowedStorage, ChartType, InstanceType } from 'src/utils';

export interface IStorage {
  getInstances: () => Promise<ReadonlyArray<InstanceType>>;
  setInstances: (instances: ReadonlyArray<InstanceType>) => Promise<void>;
  getCharts: () => Promise<ReadonlyArray<ChartType>>;
  setCharts: (charts: ReadonlyArray<ChartType>) => Promise<void>;
  delete: () => Promise<void>;
  getName: () => AllowedStorage;
}
