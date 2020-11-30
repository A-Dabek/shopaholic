import { Ref } from '@vue/composition-api';

export interface Repository<T> {
  findAll(): Ref<T[]>;
  save(name: string): void;
  remove(name: string): void;
}
