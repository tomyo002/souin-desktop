import {
  AllowedStorage,
  ChartType,
  InstanceType,
  LOCAL,
  SQLITE,
} from 'src/utils';
import {
  ClearInstance,
  GetInstance,
  SetInstance,
  GetChart,
  SetChart,
} from 'src/wailsjs/go/main/SqliteApp';
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
  async getCharts() {
    return GetChart();
  }
  async setCharts(charts: ReadonlyArray<ChartType>) {
    SetChart(charts as main.Chart[]);
  }
  async getInstances() {
    return GetInstance();
  }
  async setInstances(instances: ReadonlyArray<InstanceType>) {
    SetInstance(instances as main.Instance[]);
  }
  async delete() {
    ClearInstance();
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
