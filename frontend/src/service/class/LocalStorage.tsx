import { InstanceType } from 'src/utils';

import { abstractStorage } from './abstract';

export class LocalStorage extends abstractStorage {
  private instanceData = 'instanceData';

  get() {
    const storedDataJSON = localStorage.getItem(this.instanceData);
    if (storedDataJSON) {
      return JSON.parse(storedDataJSON);
    }
    return [];
  }
  set(instances: ReadonlyArray<InstanceType>) {
    localStorage.setItem(this.instanceData, JSON.stringify(instances));
  }

  delete() {
    localStorage.clear();
  }
}
