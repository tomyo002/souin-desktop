import { InstanceType } from 'src/utils';

export function getInstance() {
  const storedDataJSON = localStorage.getItem('instanceData');
  if (storedDataJSON) {
    return JSON.parse(storedDataJSON);
  }
}

export function setInstance(data: InstanceType) {
  localStorage.setItem('instanceData', JSON.stringify(data));
}
