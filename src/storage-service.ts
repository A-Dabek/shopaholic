import { db } from './firestore';

export class StorageService {
  static collections = {
    shops: db.collection('shops'),
    bought: db.collection('bought'),
    planner: db.collection('planner'),
  };

  addPlannerList(name: string) {
    if (!name) return;
    StorageService.collections.planner.add({ title: name, items: [] });
  }

  addShop(name: string) {
    if (!name) return;
    StorageService.collections.shops.doc(name).set({});
  }

  removeShop(id: string) {
    StorageService.collections.shops.doc(id).delete();
  }

  removeAllBoughtItems() {
    StorageService.collections.bought.get().then(collection => {
      collection.docs.forEach(doc =>
        StorageService.collections.bought.doc(doc.id).delete()
      );
    });
  }
}
