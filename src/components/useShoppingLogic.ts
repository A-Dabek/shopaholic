
import {
  Ref, onMounted
} from "@vue/composition-api";
import { db } from "../firestore";
import { flatten, orderBy } from "lodash-es";


export function useShoppingLogic(
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
    const distinctOrderedItems = distinctItems.value.filter(x => shop.value[x])
    const orderedEntries = orderBy(Object.entries(shop.value), x => x[1]);
    const pushToLast = event.moved.newIndex >= distinctOrderedItems.length;
    const newItemTuple: [string, number] = [
      event.moved.element,
      pushToLast ? distinctOrderedItems.length : event.moved.newIndex
    ];
    const newOrderedEntries = orderedEntries
      .filter(([key]) => key !== event.moved.element)
      .flatMap(item =>
        item[0] === distinctOrderedItems[event.moved.newIndex]
          ? event.moved.newIndex === 0 ? [newItemTuple, item] : [item, newItemTuple]
          : [item]
      )
      .map(([key], index) => [key, index]);
    const newShopOrder = Object.fromEntries(
      pushToLast ? [...newOrderedEntries, newItemTuple] : newOrderedEntries
    );
    db.collection("shops")
      .doc("first shop")
      .set(newShopOrder);
  }

  return {
    onReorder
  }
}