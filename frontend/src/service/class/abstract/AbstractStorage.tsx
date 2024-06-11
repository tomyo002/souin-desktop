import { IStorage } from 'src/service/interface';
import { AllowedStorage, ChartType, InstanceType } from 'src/utils';

export abstract class AbstractStorage implements IStorage {
  abstract getInstances(): Promise<readonly InstanceType[]>;
  abstract setInstances(instances: readonly InstanceType[]): Promise<void>;
  abstract getCharts(): Promise<readonly ChartType[]>;
  abstract setCharts(charts: readonly ChartType[]): Promise<void>;
  abstract delete(): Promise<void>;
  abstract getName(): AllowedStorage;
}
