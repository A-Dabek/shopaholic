import { Ref, onMounted } from '@vue/composition-api';
import { db } from '../firestore';
import { flatten, orderBy } from 'lodash-es';

export function useShoppingLogic(
  shopName: string,
  planned: Ref<string[]>,
  shop: Ref<{ [k: string]: number }>,
  distinctItems: Ref<readonly string[]>,
  itemReordered: Ref<string>,
  itemsBetween: Ref<string[]>
) {
  onMounted(() => {
    db.collection('planner')
      .get()
      .then(snapshot => {
        planned.value = flatten(snapshot.docs.map(doc => doc.data().items));
      });
    0;
  });

  function getOrderedEntries() {
    const orderedEntries = orderBy(Object.entries(shop.value), x => x[1]);
    return [
      ...orderedEntries,
      ...distinctItems.value
        .filter(x => shop.value[x] == null)
        .map(
          (x, index) => [x, index + orderedEntries.length] as [string, number]
        ),
    ];
  }

  function reset() {
    itemReordered.value = '';
    itemsBetween.value = [];
  }

  function onReorder(event: {
    moved: { element: string; oldIndex: number; newIndex: number };
  }) {
    const distinctOrderedItems = distinctItems.value.filter(
      x => shop.value[x] != null
    );
    const orderedEntries = getOrderedEntries();

    const itemBefore =
      distinctOrderedItems[event.moved.newIndex - 1] || orderedEntries[0][0];
    const itemNext =
      distinctOrderedItems[event.moved.newIndex] ||
      orderedEntries[orderedEntries.length - 1][0];
    const indexOfItemBefore = orderedEntries.findIndex(
      it => it[0] === itemBefore
    );
    const indexOfItemNext = orderedEntries.findIndex(it => it[0] === itemNext);
    const newItemsBetween = orderedEntries
      .slice(indexOfItemBefore + 1, indexOfItemNext)
      .map(i => i[0]);

    // console.log(orderedEntries);
    // console.log(itemBefore, indexOfItemBefore);
    // console.log(itemNext, indexOfItemNext);
    // console.log(itemReordered.value, itemsBetween.value);

    if (newItemsBetween.length === 0) {
      if (event.moved.newIndex === 0) {
        reorder(event.moved.element, itemBefore, false);
      } else {
        reorder(event.moved.element, itemNext, true);
      }
    } else {
      itemReordered.value = event.moved.element;
      itemsBetween.value = newItemsBetween;
    }
  }

  function reorder(first: string, second: string, reverse = true) {
    const newOrderedEntries = getOrderedEntries()
      .map(tuple => tuple[0])
      .filter(key => key !== first)
      .flatMap(key =>
        key === second ? (reverse ? [key, first] : [first, key]) : [key]
      )
      .map((key, index) => [key, index]);
    const newShopOrder = Object.fromEntries(newOrderedEntries);
    db.collection('shops').doc(shopName).set(newShopOrder);
    reset();
  }

  function removeFromList(item: string) {
    const newShopOrder = Object.fromEntries(
      Object.entries(shop.value).filter(([key]) => key !== item)
    );
    itemsBetween.value = itemsBetween.value.filter(key => key !== item);
    db.collection('shops').doc(shopName).set(newShopOrder);
  }

  return {
    onReorder,
    reorder,
    removeFromList,
  };
}
