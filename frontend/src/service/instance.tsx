import { InstanceType } from 'src/utils';

import { InstanceData } from './class';

const instanceStorage = new InstanceData();

export function setInstances(instances: ReadonlyArray<InstanceType>) {
  instanceStorage.set(instances);
}

export function getAllInstances(): Promise<ReadonlyArray<InstanceType>> {
  return instanceStorage.get();
}
