import { PlanList, PlanListRepository } from '@/feature/planning/model';
import { FirestoreRepository } from './firestore-repository';
import { StorageService } from './storage-service';

export class PlanListRepositoryFirestore
  extends FirestoreRepository<PlanList>
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
}
