import { StorageService } from '@/repository/storage-service';
import { computed } from '@vue/composition-api';
import { orderBy } from 'lodash-es';
import { PlanList, PlanListItem } from './model';

export function useListLogic(props: { data: PlanList }) {
  function removeList() {
    StorageService.collections.toBuyList(props.data.id).delete();
  }
  function addToList(item: PlanListItem) {
    StorageService.collections.product.doc(item.name).set({});
    StorageService.collections.toBuyList(props.data.id).update({
      items: [...props.data.items, item],
    });
  }
  function removeFromList(item: string) {
    const foundIndex = props.data.items.findIndex(el => el.name === item);
    StorageService.collections.toBuyList(props.data.id).update({
      items: props.data.items.filter((_, index) => index !== foundIndex),
    });
  }
  function resetList() {
    StorageService.collections.toBuyList(props.data.id).update({
      items: [],
    });
  }
  const items = computed(() => orderBy(props.data.items, item => item.name));
  return {
    items,
    addToList,
    removeFromList,
    removeList,
    resetList,
  };
}
