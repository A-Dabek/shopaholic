import { StorageService } from '@/repository/storage-service';
import { ListItemService } from '@/feature/planning/list-item-service';

export class PlanListRepository {
  async create(name: string) {
    if (!name) return;
    await StorageService.collections.lists.doc(name).set({
      timestamp: new Date().getTime(),
    });
  }

  async remove(name: string) {
    await StorageService.collections.lists.doc(name).delete();
  }

  forList(name: string): ListItemService {
    return new ListItemService(name);
  }
}
