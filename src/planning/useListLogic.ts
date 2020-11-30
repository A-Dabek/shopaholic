import { StorageService } from '@/repository/storage-service';
import { computed } from '@vue/composition-api';
import { orderBy } from 'lodash-es';
import { ItemToBuy } from './item-to-buy';

export interface ListData {
  id: string;
  items: ItemToBuy[];
  title: string;
}

export function useListLogic(props: { data: ListData }) {
  function removeList() {
    StorageService.collections.toBuyList(props.data.id).delete();
  }
  function addToList(item: ItemToBuy) {
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
