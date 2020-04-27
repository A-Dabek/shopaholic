<template>
  <div class="wrapper">
    <draggable :value="distinctItems" tag="ol" @change="onReorder">
      <li
        v-for="(item, index) of distinctItems"
        :key="item"
        :class="{'bought': boughtDict[item]}"
        @click="() => onItemClick(item)"
      >
        <fa-i v-if="shop[item] === undefined" icon="question"></fa-i>
        <span v-else>{{index + 1}}.</span>
        {{item}}
        <span class="count">{{itemCount[item]}}</span>
      </li>
    </draggable>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  computed,
  onUnmounted,
  set
} from "@vue/composition-api";
import { db } from "../firestore";
import { countBy, flatten, orderBy } from "lodash-es";
import draggable from "vuedraggable";

export default defineComponent({
  name: "Shopping",
  components: {
    draggable
  },
  firestore: {
    shop: db.collection("shops").doc("first shop"),
    bought: db.collection("bought"),
    planned: db.collection("planner")
  },
  setup() {
    const shop = ref<{ [k: string]: number }>({});

    const planned = ref([]);
    const itemCount = computed(() => countBy(planned.value));
    const distinctItems = computed(() =>
      orderBy(Object.keys(itemCount.value), x => shop.value[x])
    );

    const bought = ref<{ id: string }[]>([]);
    const boughtDict = computed<{ [k: string]: boolean }>(() =>
      bought.value
        .map(data => data.id)
        .reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
    );
    function onItemClick(item: string) {
      if (boughtDict.value[item]) {
        db.collection("bought")
          .doc(item)
          .delete();
      } else {
        db.collection("bought")
          .doc(item)
          .set({});
      }
    }

    function onReorder(event: {
      moved: { element: string; oldIndex: number; newIndex: number };
    }) {
      const orderedEntries = orderBy(Object.entries(shop.value), x => x[1]);
      const pushToLast = event.moved.newIndex >= orderedEntries.length;
      const movingForwards = event.moved.newIndex > event.moved.oldIndex;
      const newItemTuple: [string, number] = [
        event.moved.element,
        pushToLast ? orderedEntries.length : event.moved.newIndex
      ];
      const newOrderedEntries = orderedEntries
        .filter(([key]) => key !== event.moved.element)
        .flatMap((item, index) =>
          item[1] === event.moved.newIndex ? (movingForwards ? [item, newItemTuple] : [newItemTuple, item]) : [item]
        )
        .map(([key], index) => [key, index]);
      const newShopOrder = Object.fromEntries(pushToLast ? [...newOrderedEntries, newItemTuple] : newOrderedEntries);
      db.collection("shops")
        .doc("first shop")
        .set(newShopOrder);
    }

    onMounted(() => {
      db.collection("planner")
        .get()
        .then(snapshot => {
          planned.value = flatten(
            snapshot.docs.map(doc => doc.data().items)
          ) as any;
        });
    });
    return {
      bought,
      planned,
      shop,
      itemCount,
      distinctItems,
      boughtDict,
      onItemClick,
      onReorder
    };
  }
});
</script>

<style scoped>
li {
  list-style: none;
}
li.bought {
  text-decoration: line-through;
}
.count {
  float: right;
}
</style>
