import { ref, Ref, watchEffect } from '@vue/composition-api';
import { Repository } from './repository';

export class FirestoreRepository<T = string> implements Repository<T> {
  protected data: Ref<T[]>;

  constructor(protected collection: firebase.firestore.CollectionReference) {
    this.data = ref([]);
  }

  map(doc: firebase.firestore.DocumentData): T {
    return doc.id as T;
  }

  findAll(): Ref<T[]> {
    watchEffect(() => {
      return this.collection.onSnapshot(snapshot => {
        this.data.value = snapshot.docs.map(doc => this.map(doc));
      });
    });
    return this.data;
  }

  saveItem(item: Omit<T, 'id'>): void {
    this.collection.add(item);
  }

  save(name: string): void {
    if (!name) return;
    this.collection
      .doc(name.trim().toLocaleLowerCase())
      .set({}, { merge: true });
  }

  remove(name: string): void {
    this.collection.doc(name).delete();
  }
}
