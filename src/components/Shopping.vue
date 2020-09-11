<template>
  <div class="wrapper">
    <draggable :value="distinctItems" tag="ol" @change="onReorder" fallbackTolerance="5">
      <li
        v-for="(item, index) of distinctItems"
        :key="item"
        class="shopping-item"
        :class="{bought: boughtDict[item]}"
      >
        <div class="shopping-item-wrapper" @click="() => onItemClick(item)">
          <fa-i v-if="shop[item] === undefined" icon="question"></fa-i>
          <span v-else>{{index + 1}}.</span>
          {{item}}
          <span class="count">{{itemCount[item]}}</span>
        </div>

        <ol v-if="item === itemReordered">
          <li @click="reorder(item, itemsBetween[0], false)">{{index + 1}}. Pierwszy</li>
          <li
            v-for="(nestedItem, nestedIndex) of itemsBetween"
            :key="nestedItem"
            class="reorder-list-item"
          >
            <div class="order-item-wrapper">
              <label @click="reorder(item, nestedItem)">{{index + nestedIndex + 2}}. {{nestedItem}}</label>
              <fa-i class="remove-item" icon="times" @click="removeFromList(nestedItem)"></fa-i>
            </div>
          </li>
        </ol>
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
  set,
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
      required: true,
    },
  },
  components: {
    draggable,
  },
  firestore: {
    bought: db.collection("bought"),
    planned: db.collection("planner"),
  },
  setup(props) {
    const shop = ref<{ [k: string]: number }>({});
    let unsubscribe: () => void = () => undefined;

    onMounted(() => {
      unsubscribe = db
        .collection("shops")
        .doc(props.shopName)
        .onSnapshot((snapshot) => {
          shop.value = snapshot.data() as any;
        });
    });

    onUnmounted(() => {
      unsubscribe();
    });

    const planned = ref<string[]>([]);
    const itemCount = computed(() => countBy(planned.value));
    const distinctItems = computed(() =>
      orderBy(Object.keys(itemCount.value), (x) => shop.value[x])
    );

    const bought = ref<{ id: string }[]>([]);
    const boughtDict = computed<{ [k: string]: boolean }>(() =>
      bought.value
        .map((data) => data.id)
        .reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
    );

    const itemReordered = ref<string>("");
    const itemsBetween = ref<string[]>([]);

    return {
      itemReordered,
      itemsBetween,
      bought,
      planned,
      shop,
      itemCount,
      distinctItems,
      boughtDict,
      ...useShoppingLogic(
        props.shopName,
        planned,
        shop,
        distinctItems,
        itemReordered,
        itemsBetween
      ),
      ...useBoughtLogic(boughtDict),
    };
  },
});
</script>

<style scoped>
.wrapper {
  border-left: 1.75rem double black;
  border-right: 1.75rem double black;
}
ol {
  padding: 0;
  padding-right: 5px;
  padding-left: 5px;
}
li {
  list-style: none;
  font-size: 1.25rem;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-right: 5px;
  padding-left: 5px;
}
li.shopping-item:nth-child(10n + 1) div.shopping-item-wrapper {
  background: #dce775;
  --var-color: #dce775;
}
li.shopping-item:nth-child(10n + 3) div.shopping-item-wrapper {
  background: #4db6ac;
  --var-color: #4db6ac;
}
li.shopping-item:nth-child(10n + 5) div.shopping-item-wrapper {
  background: #a1887f;
  --var-color: #a1887f;
}
li.shopping-item:nth-child(10n + 7) div.shopping-item-wrapper {
  background: #f3cc74;
  --var-color: #f3cc74;
}
li.shopping-item:nth-child(10n + 9) div.shopping-item-wrapper {
  background: #e08a8a;
  --var-color: #e08a8a;
}
li.bought {
  text-decoration: line-through;
}
.count {
  float: right;
  font-weight: bold;
}
.order-item-wrapper {
  display: flex;
  align-items: baseline;
}
.order-item-wrapper label {
  flex-grow: 1;
}
.remove-item {
  width: 15%;
  align-self: right;
  flex-grow: 0;
  margin-left: 15px;
}
</style>
