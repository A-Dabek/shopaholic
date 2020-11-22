import { db } from './firestore';

export class StorageService {
  private readonly collection = {
    boughtItems: 'bought',
    shops: 'shops',
    planner: 'planner',
  };

  addPlannerList(name: string) {
    if (!name) return;
    db.collection(this.collection.planner).add({ title: name, items: [] });
  }

  addShop(name: string) {
    if (!name) return;
    db.collection(this.collection.shops).doc(name).set({});
  }

  removeShop(id: string) {
    db.collection(this.collection.shops).doc(id).delete();
  }

  removeAllBoughtItems() {
    db.collection(this.collection.boughtItems)
      .get()
      .then(collection => {
        collection.docs.forEach(doc =>
          db.collection(this.collection.boughtItems).doc(doc.id).delete()
        );
      });
  }
}
