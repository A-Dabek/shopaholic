
import {
  Ref, onMounted
} from "@vue/composition-api";
import { db } from "../firestore";
import { flatten, orderBy } from "lodash-es";


export function useShoppingLogic(
  shopName: string,
  planned: Ref<string[]>,
  shop: Ref<{ [k: string]: number }>,
  distinctItems: Ref<readonly string[]>
) {
  onMounted(() => {
    db.collection("planner")
      .get()
      .then(snapshot => {
        planned.value = flatten(snapshot.docs.map(doc => doc.data().items));
      });
  });

  function onReorder(event: {
    moved: { element: string; oldIndex: number; newIndex: number };
  }) {
    const distinctOrderedItems = distinctItems.value.filter(x => shop.value[x] != null)
    const orderedEntries = orderBy(Object.entries(shop.value), x => x[1]);
    const pushToLast = event.moved.newIndex >= distinctOrderedItems.length;
    const newItemTuple: [string, number] = [
      event.moved.element,
      pushToLast ? distinctOrderedItems.length : event.moved.newIndex
    ];
    const movingForward = event.moved.newIndex > event.moved.oldIndex;
    const newOrderedEntries = orderedEntries
      .filter(([key]) => key !== event.moved.element)
      .flatMap(item =>
        item[0] === distinctOrderedItems[event.moved.newIndex]
          ? movingForward ? [item, newItemTuple] : [newItemTuple, item] 
          : [item]
      )
      .map(([key], index) => [key, index]);
    const newShopOrder = Object.fromEntries(
      pushToLast ? [...newOrderedEntries, newItemTuple] : newOrderedEntries
    );
    db.collection("shops")
      .doc(shopName)
      .set(newShopOrder);
  }

  return {
    onReorder
  }
}