import { Ref } from '@vue/composition-api';

export interface ShopRepository {
  findAll(): Ref<string[]>;
  add(name: string): void;
  remove(name: string): void;
}
