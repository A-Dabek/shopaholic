import { ref, Ref } from '@vue/composition-api';
import { ShopRepository } from './shop-repository';

export class ShopRepositoryStub implements ShopRepository {
  shops = ref<string[]>([]);
  findAll(): Ref<string[]> {
    return this.shops;
  }

  add(name: string): void {
    this.shops.value = [
      ...this.shops.value.filter(shop => shop !== name),
      name,
    ];
  }

  remove(name: string): void {
    this.shops.value = this.shops.value.filter(shop => shop !== name);
  }
}
