import { InstanceType } from 'src/utils';

export function setInstance(data: InstanceType) {
  const instances = getAllInstances();
  localStorage.setItem('instanceData', JSON.stringify([...instances, data]));
}

export function getAllInstances(): ReadonlyArray<InstanceType> {
  const storedDataJSON = localStorage.getItem('instanceData');
  if (storedDataJSON) {
    return JSON.parse(storedDataJSON);
  }
  return [];
}

export function resetAll() {
  localStorage.clear();
}

export function deleteInstance(instance: InstanceType) {
  const instances = getAllInstances();
  localStorage.setItem(
    'instanceData',
    JSON.stringify(
      instances.filter(
        inst =>
          inst.name !== instance.name && inst.baseUrl !== instance.baseUrl,
      ),
    ),
  );
}
