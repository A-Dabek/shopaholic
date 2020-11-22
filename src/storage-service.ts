import { db } from './firestore';

export class StorageService {
  static collections = {
    shops: db.collection('shops'),
    bought: db.collection('bought'),
    planner: db.collection('planner'),
    alley: (shop: string) =>
      StorageService.collections.shops.doc(shop).collection('alley'),
  };

  getAlleys(shop: string) {
    return StorageService.collections.shops.doc(shop).collection('alley');
  }

  addPlannerList(name: string) {
    if (!name) return;
    StorageService.collections.planner.add({ title: name, items: [] });
  }

  addShop(name: string) {
    if (!name) return;
    StorageService.collections.shops.doc(name).set({});
  }

  removeShop(name: string) {
    StorageService.collections.shops.doc(name).delete();
  }

  addAlley(shop: string, alley: string) {
    if (!alley) return;
    StorageService.collections
      .alley(shop)
      .doc(alley)
      .set({ order: 0, items: [] });
  }

  setAlleyOrder(shop: string, alley: string, order: number) {
    if (!name) return;
    StorageService.collections.alley(shop).doc(alley).update({ order: 0 });
  }

  removeAlley(shop: string, alley: string) {
    StorageService.collections.alley(shop).doc(alley).delete();
  }

  removeAllBoughtItems() {
    StorageService.collections.bought.get().then(collection => {
      collection.docs.forEach(doc =>
        StorageService.collections.bought.doc(doc.id).delete()
      );
    });
  }
}
