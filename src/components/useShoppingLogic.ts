
import {
  Ref, onMounted
} from "@vue/composition-api";
import { db } from "../firestore";
import { flatten, orderBy } from "lodash-es";


export function useShoppingLogic(
  planned: Ref<string[]>,
  shop: Ref<{ [k: string]: number }>,
  distinctItems: Ref<string[]>
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
    const orderedEntries = orderBy(Object.entries(shop.value), x => x[1]);
    const pushToLast = event.moved.newIndex >= distinctItems.value.length;
    const newItemTuple: [string, number] = [
      event.moved.element,
      pushToLast ? distinctItems.value.length : event.moved.newIndex
    ];
    const newOrderedEntries = orderedEntries
      .filter(([key]) => key !== event.moved.element)
      .flatMap(item =>
        item[0] === distinctItems.value[event.moved.newIndex]
          ? [newItemTuple, item]
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