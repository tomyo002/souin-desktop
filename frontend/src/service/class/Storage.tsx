import { InstanceType } from 'src/utils';
import { Clear, Get, Set } from 'src/wailsjs/go/main/InstanceApp';
import { main } from 'src/wailsjs/go/models';

import { AbstractStorage } from './abstract';

export class LocalStorage extends AbstractStorage {
  private instanceData = 'instanceData';

  async get() {
    const storedDataJSON = localStorage.getItem(this.instanceData);
    if (storedDataJSON) {
      return JSON.parse(storedDataJSON);
    }
    return [];
  }
  async set(instances: ReadonlyArray<InstanceType>) {
    localStorage.setItem(this.instanceData, JSON.stringify(instances));
  }

  async delete() {
    localStorage.clear();
  }
}

export class SqliteStorage extends AbstractStorage {
  async get() {
    return Get();
  }
  async set(instances: ReadonlyArray<InstanceType>) {
    Set(instances as main.Instance[]);
  }
  async delete() {
    Clear();
  }
}

export class InstanceData extends SqliteStorage {}
