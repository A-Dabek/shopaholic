import { ShopRepository } from '@/feature/shops/shop-repository';
import { FirestoreRepository } from './firestore-repository';
import { StorageService } from './storage-service';

export class ShopRepositoryFirestore
  extends FirestoreRepository<string>
  implements ShopRepository {
  constructor() {
    super(StorageService.collections.shops);
  }

  add(name: string): void {
    super.save(name);
  }
}
