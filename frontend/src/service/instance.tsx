import { InstanceType } from 'src/utils';

import { IStorage } from './interface';

export function setInstances(
  storage: IStorage,
  instances: ReadonlyArray<InstanceType>,
) {
  storage.set(instances);
}

export function getAllInstances(
  storage: IStorage,
): Promise<ReadonlyArray<InstanceType>> {
  return storage.get();
}
