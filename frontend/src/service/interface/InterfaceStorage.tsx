import { InstanceType } from 'src/utils';

export interface interfaceStorage {
  get: () => ReadonlyArray<InstanceType>;
  set: (instances: ReadonlyArray<InstanceType>) => void;
  delete: () => void;
}
