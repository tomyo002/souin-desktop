import {
  AllowedStorage,
  ChartType,
  InstanceType,
  LOCAL,
  SQLITE,
} from 'src/utils';
import { Clear, Get, Set } from 'src/wailsjs/go/main/InstanceApp';
import { main } from 'src/wailsjs/go/models';

import { IStorage } from '../interface';

import { AbstractStorage } from './abstract';

export class LocalStorage extends AbstractStorage {
  private instanceData = 'instanceData';
  private chartData = 'chartData';

  async getInstances() {
    const storedDataJSON = localStorage.getItem(this.instanceData);
    if (storedDataJSON) {
      return JSON.parse(storedDataJSON);
    }
    return [];
  }

  async setInstances(instances: ReadonlyArray<InstanceType>) {
    localStorage.setItem(this.instanceData, JSON.stringify(instances));
  }

  async getCharts(): Promise<readonly ChartType[]> {
    const storedDataJSON = localStorage.getItem(this.chartData);
    if (storedDataJSON) {
      return JSON.parse(storedDataJSON);
    }
    return [];
  }

  async setCharts(charts: readonly ChartType[]): Promise<void> {
    localStorage.setItem(this.chartData, JSON.stringify(charts));
  }

  async delete() {
    localStorage.clear();
  }

  getName(): AllowedStorage {
    return LOCAL;
  }
}

export class SqliteStorage extends AbstractStorage {
  getCharts(): Promise<readonly ChartType[]> {
    throw new Error('Method not implemented.');
  }
  setCharts(charts: readonly ChartType[]): Promise<void> {
    throw new Error(`Method not implemented. ${charts}`);
  }
  async getInstances() {
    return Get();
  }
  async setInstances(instances: ReadonlyArray<InstanceType>) {
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

  async getCharts() {
    return this.currentStorage.getCharts();
  }

  async setCharts(charts: ReadonlyArray<ChartType>) {
    return this.currentStorage.setCharts(charts);
  }

  async getInstances() {
    return this.currentStorage.getInstances();
  }

  async setInstances(instances: ReadonlyArray<InstanceType>) {
    this.currentStorage.setInstances(instances);
  }

  async delete() {
    this.currentStorage.delete();
  }

  getName() {
    return this.currentStorage.getName();
  }
}

export class InstanceData extends SwitchStorage {}
