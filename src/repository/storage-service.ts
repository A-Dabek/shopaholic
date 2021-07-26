import firebase from 'firebase';
import { db } from './firestore';
import CollectionReference = firebase.firestore.CollectionReference;

export class StorageService {
  static collections = {
    bought: db.collection('bought'),
    removed: db.collection('removed'),
    toBuyList: (id: string) => db.collection('planner').doc(id),
    planner: db.collection('planner'),
  };

  removeAllRecentlyRemovedItems() {
    this.removeCollection(StorageService.collections.removed);
  }

  removeAllBoughtItems() {
    this.removeCollection(StorageService.collections.bought);
  }

  private removeCollection(collectionRef: CollectionReference) {
    collectionRef.get().then(collection => {
      collection.docs.forEach(doc => collectionRef.doc(doc.id).delete());
    });
  }
}
