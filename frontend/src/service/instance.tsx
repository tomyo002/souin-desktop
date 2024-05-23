import { AllowedStorage } from 'src/context';
import { InstanceType } from 'src/utils';

import { InstanceData } from './class';

const instanceStorage = new InstanceData();

export function setInstances(
  storage: AllowedStorage,
  instances: ReadonlyArray<InstanceType>,
) {
  instanceStorage.set(storage, instances);
}

export function getAllInstances(
  storage: AllowedStorage,
): Promise<ReadonlyArray<InstanceType>> {
  return instanceStorage.get(storage);
}
