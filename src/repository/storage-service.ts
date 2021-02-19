import { db } from './firestore';

export class StorageService {
  static collections = {
    product: db.collection('products'),
    bought: db.collection('bought'),
    toBuyList: (id: string) => db.collection('planner').doc(id),
    planner: db.collection('planner'),
  };

  removeAllBoughtItems() {
    StorageService.collections.bought.get().then(collection => {
      collection.docs.forEach(doc =>
        StorageService.collections.bought.doc(doc.id).delete()
      );
    });
  }
}
