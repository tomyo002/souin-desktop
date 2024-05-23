import { IStorage } from 'src/service/interface';
import { InstanceType } from 'src/utils';

export abstract class AbstractStorage implements IStorage {
  abstract get(): Promise<readonly InstanceType[]>;
  abstract set(instances: readonly InstanceType[]): Promise<void>;
  abstract delete(): Promise<void>;
}
