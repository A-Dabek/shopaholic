import {
  PlanList,
  PlanListItem,
  PlanListRepository,
} from '@/feature/planning/model';
import { FirestoreRepository } from './firestore-repository';
import { Entity } from './model';
import { StorageService } from './storage-service';

export class PlanListRepositoryFirestore
  extends FirestoreRepository<PlanList & Entity>
  implements PlanListRepository {
  constructor() {
    super(StorageService.collections.planner);
  }

  map(document: firebase.firestore.DocumentData) {
    return { id: document.id, ...document.data() };
  }

  add(name: string) {
    super.saveItem({ title: name, items: [] });
  }

  addListItem(listName: string, item: PlanListItem): void {
    const list = this.data.value.find(l => l.title === listName);
    if (!list) return;
    StorageService.collections.product.doc(item.name).set({});
    StorageService.collections.toBuyList(list.id).update({
      items: [...list.items, item],
    });
  }

  removeListItem(listName: string, item: string): void {
    const list = this.data.value.find(l => l.title === listName);
    if (!list) return;
    const foundIndex = list.items.findIndex(i => i.name === item);
    StorageService.collections.toBuyList(list.id).update({
      items: list.items.filter((_, index) => index !== foundIndex),
    });
  }
}
