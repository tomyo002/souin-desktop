import { AllowedStorage } from 'src/context';
import { InstanceType } from 'src/utils';

export interface IStorage {
  get: () => Promise<ReadonlyArray<InstanceType>>;
  set: (instances: ReadonlyArray<InstanceType>) => Promise<void>;
  delete: () => Promise<void>;
  getName: () => AllowedStorage;
}
