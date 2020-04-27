<template>
  <div class="wrapper">
    <draggable :value="distinctItems" tag="ol" @change="onReorder" fallbackTolerance="5">
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
import { useShoppingLogic } from "./useShoppingLogic";
import { useBoughtLogic } from "./useBoughtLogic";

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
    const planned = ref<string[]>([]);
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

    return {
      bought,
      planned,
      shop,
      itemCount,
      distinctItems,
      boughtDict,
      ...useShoppingLogic(planned, shop),
      ...useBoughtLogic(boughtDict)
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
