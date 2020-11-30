import { ShopRepository } from '@/feature/shops/shop-repository';
import { ref, Ref, watchEffect } from '@vue/composition-api';
import { StorageService } from './storage-service';

export class ShopRepositoryFirestore implements ShopRepository {
  findAll(): Ref<string[]> {
    const shops = ref<string[]>([]);
    watchEffect(() => {
      return StorageService.collections.shops.onSnapshot(snapshot => {
        shops.value = snapshot.docs.map(doc => doc.id);
      });
    });
    return shops;
  }
  add(name: string): void {
    if (!name) return;
    StorageService.collections.shops
      .doc(name.trim().toLocaleLowerCase())
      .set({}, { merge: true });
  }
  remove(name: string): void {
    StorageService.collections.shops.doc(name).delete();
  }
}
