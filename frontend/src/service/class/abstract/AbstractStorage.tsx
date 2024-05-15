import { interfaceStorage } from 'src/service/interface';
import { InstanceType } from 'src/utils';

export abstract class abstractStorage implements interfaceStorage {
  abstract get(): readonly InstanceType[];
  abstract set(instances: readonly InstanceType[]): void;
  abstract delete(): void;
}
