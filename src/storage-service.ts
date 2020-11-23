import { orderBy } from 'lodash-es';
import { Alley } from './alley/alley';
import { db } from './firestore';

export class StorageService {
  static collections = {
    shops: db.collection('shops'),
    product: db.collection('products'),
    bought: db.collection('bought'),
    toBuyList: (id: string) => db.collection('planner').doc(id),
    planner: db.collection('planner'),
    alleys: (shop: string) =>
      StorageService.collections.shops.doc(shop).collection('alley'),
    alley: (shop: string, alley: string) =>
      StorageService.collections.shops.doc(shop).collection('alley').doc(alley),
  };

  getAlleys(shop: string, callback: (data: Alley[]) => void) {
    return StorageService.collections.shops
      .doc(shop)
      .collection('alley')
      .onSnapshot(snapshot => {
        const data = orderBy(
          snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Alley)),
          'order'
        );
        callback(data);
      });
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

  addAlley(shop: string, alley: string, order: number) {
    if (!alley) return;
    StorageService.collections
      .alleys(shop)
      .doc(alley)
      .set({ order, items: [] });
  }

  setAlleyOrder(shop: string, alleys: string[]) {
    alleys.forEach((alley, index) => {
      StorageService.collections
        .alleys(shop)
        .doc(alley)
        .update({ order: index });
    });
  }

  removeAlley(shop: string, alley: string) {
    StorageService.collections.alleys(shop).doc(alley).delete();
  }

  removeAllBoughtItems() {
    StorageService.collections.bought.get().then(collection => {
      collection.docs.forEach(doc =>
        StorageService.collections.bought.doc(doc.id).delete()
      );
    });
  }
}
