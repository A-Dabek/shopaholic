import { db } from './firestore';

export class StorageService {
  private readonly collection = {
    boughtItems: 'bought',
  };

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
