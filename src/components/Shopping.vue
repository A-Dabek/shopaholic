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
  props: {
    shopName: {
      type: String,
      required: true
    }
  },
  components: {
    draggable
  },
  firestore: {
    bought: db.collection("bought"),
    planned: db.collection("planner")
  },
  setup(props) {
    const shop = ref<{ [k: string]: number }>({});
    let unsubscribe: () => void = () => undefined;

    onMounted(() => {
      unsubscribe = db
        .collection("shops")
        .doc(props.shopName)
        .onSnapshot(snapshot => {
          shop.value = snapshot.data() as any;
        });
    });

    onUnmounted(() => {
      unsubscribe();
    });

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
      ...useShoppingLogic(props.shopName, planned, shop, distinctItems),
      ...useBoughtLogic(boughtDict)
    };
  }
});
</script>

<style scoped>
.wrapper {
  padding: 2px 4px;
}
ol {
  padding: 0;
}
li {
  list-style: none;
  font-size: 1.25rem;
}
li.bought {
  text-decoration: line-through;
}
.count {
  float: right;
}
</style>
