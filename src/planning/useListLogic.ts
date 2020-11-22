import { db } from '../firestore';
import { computed } from '@vue/composition-api';
import { countBy } from 'lodash-es';

export interface ListData {
  id: string;
  items: string[];
  title: string;
}

export function useListLogic({ data }: { data: ListData }) {
  function removeList() {
    db.collection('planner').doc(data.id).delete();
  }
  function addToList(item: string) {
    db.collection('planner')
      .doc(data.id)
      .update({
        items: [...data.items, item],
      });
  }
  function removeFromList(item: string) {
    const foundIndex = data.items.findIndex(el => el === item);
    db.collection('planner')
      .doc(data.id)
      .update({
        items: data.items.filter((_, index) => index !== foundIndex),
      });
  }
  function resetList() {
    db.collection('planner').doc(data.id).update({
      items: [],
    });
  }
  const itemCount = computed(() => countBy(data.items));
  const distinctItems = computed(() => Object.keys(itemCount.value).sort());
  return {
    itemCount,
    distinctItems,
    addToList,
    removeFromList,
    removeList,
    resetList,
  };
}
