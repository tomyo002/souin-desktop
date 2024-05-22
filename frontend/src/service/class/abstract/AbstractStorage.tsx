import { InterfaceStorage } from 'src/service/interface';
import { InstanceType } from 'src/utils';

export abstract class AbstractStorage implements InterfaceStorage {
  abstract get(): Promise<readonly InstanceType[]>;
  abstract set(instances: readonly InstanceType[]): Promise<void>;
  abstract delete(): Promise<void>;
}
