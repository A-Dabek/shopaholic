<template>
  <div class="wrapper">
    <ol>
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
    </ol>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  computed
} from "@vue/composition-api";
import { db } from "../firestore";
import { countBy, flatten, orderBy } from "lodash-es";

export default defineComponent({
  name: "Shopping",
  firestore: {
    shop: db.collection("shops").doc("first shop"),
    bought: db.collection("bought"),
    planned: db.collection("planner")
  },
  setup() {
    const bought = ref<{ id: string }[]>([]);
    const planned = ref([]);
    const shop = ref<{ [k: string]: number }>({});
    const itemCount = computed(() => countBy(planned.value));
    const distinctItems = computed(() =>
      orderBy(Object.keys(itemCount.value), x => shop.value[x])
    );
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
      onItemClick
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
