import { AllowedStorage } from 'src/context';
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

export class InstanceData {
  localStorage;
  sqliteStorage;

  constructor() {
    this.localStorage = new LocalStorage();
    this.sqliteStorage = new SqliteStorage();
  }

  get(storage: AllowedStorage) {
    switch (storage) {
      case 'sqliteStorage':
        return this.sqliteStorage.get();
      case 'localStorage':
      default:
        return this.localStorage.get();
    }
  }

  set(storage: AllowedStorage, instances: ReadonlyArray<InstanceType>) {
    switch (storage) {
      case 'sqliteStorage':
        return this.sqliteStorage.set(instances);
      case 'localStorage':
      default:
        return this.localStorage.set(instances);
    }
  }
}
