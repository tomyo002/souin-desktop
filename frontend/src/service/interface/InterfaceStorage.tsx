import { InstanceType } from 'src/utils';

export interface InterfaceStorage {
  get: () => Promise<ReadonlyArray<InstanceType>>;
  set: (instances: ReadonlyArray<InstanceType>) => Promise<void>;
  delete: () => Promise<void>;
}
