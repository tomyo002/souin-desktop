import { AllowedStorage, InstanceType, LOCAL, SQLITE } from 'src/utils';
import { Clear, Get, Set } from 'src/wailsjs/go/main/InstanceApp';
import { main } from 'src/wailsjs/go/models';

import { IStorage } from '../interface';

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

  getName(): AllowedStorage {
    return LOCAL;
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

  getName(): AllowedStorage {
    return SQLITE;
  }
}

export class SwitchStorage implements IStorage {
  currentStorage: IStorage;

  constructor(storage: AllowedStorage) {
    switch (storage) {
      case SQLITE:
        this.currentStorage = new SqliteStorage();
        break;
      default:
        this.currentStorage = new LocalStorage();
    }
  }

  async get() {
    return this.currentStorage.get();
  }

  async set(instances: ReadonlyArray<InstanceType>) {
    this.currentStorage.set(instances);
  }

  async delete() {
    this.currentStorage.delete();
  }

  getName() {
    return this.currentStorage.getName();
  }
}

export class InstanceData extends SwitchStorage {}

export class InstanceData extends SwitchStorage {}
