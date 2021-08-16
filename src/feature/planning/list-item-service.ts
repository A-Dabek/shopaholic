import { StorageService } from '@/repository/storage-service';
import { PlanListItem } from '@/feature/planning/model';
import { firestore } from 'firebase';

export class ListItemService {
  readonly collection: firestore.CollectionReference;

  constructor(readonly name: string) {
    this.collection = StorageService.collections.toBuyList(this.name);
  }

  async add(name: string, item: PlanListItem) {
    await this.collection.doc(name).set(item);
  }

  async remove(name: string) {
    await this.collection.doc(name).delete();
  }

  clear() {
    new StorageService().removeCollection(this.collection);
  }

  clearBought() {
    StorageService.collections.bought.get().then(collection => {
      collection.docs.forEach(doc => this.collection.doc(doc.id).delete());
    });
  }
}
