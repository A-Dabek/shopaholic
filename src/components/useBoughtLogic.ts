import { Ref } from '@vue/composition-api';
import { db } from '@/repository/firestore';

export function useBoughtLogic(boughtDict: Ref<{ [k: string]: boolean }>) {
  function onItemClick(item: string) {
    if (boughtDict.value[item]) {
      db.collection('bought').doc(item).delete();
    } else {
      db.collection('bought').doc(item).set({});
    }
  }
  return {
    onItemClick,
  };
}
