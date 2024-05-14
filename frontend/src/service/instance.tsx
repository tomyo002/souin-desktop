import { InstanceType } from 'src/utils';

const instanceData = 'instanceData';

export function setInstances(instances: ReadonlyArray<InstanceType>) {
  localStorage.setItem(instanceData, JSON.stringify(instances));
}

export function getAllInstances(): ReadonlyArray<InstanceType> {
  const storedDataJSON = localStorage.getItem(instanceData);
  if (storedDataJSON) {
    return JSON.parse(storedDataJSON);
  }
  return [];
}
