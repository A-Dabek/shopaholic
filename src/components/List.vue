<template>
  <div>
    <label>
      <span>{{ data.title }}</span>
      <fa-i class="remove-list" icon="times" @click="remove"></fa-i>
    </label>
    <ul>
      <ListItem
        v-for="item of distinctItems"
        :key="item"
        :item="item"
        :count="itemCount[item]"
        @increment="() => addToList(item)"
        @decrement="() => removeFromList(item)"
      />
    </ul>
    <ProductSelect @select="addToList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "@vue/composition-api";
import ListItem from "./ListItem.vue";
import ProductSelect from "./ProductSelect.vue";
import { db } from "../firestore";
import { uniq, countBy } from "lodash-es";

export interface ListData {
  id: string;
  items: string[];
  title: string;
}

export default defineComponent({
  name: "List",
  components: {
    ListItem,
    ProductSelect
  },
  props: {
    data: {
      type: Object as () => ListData,
      required: true
    }
  },
  setup(props) {
    function remove() {
      db.collection("planner")
        .doc(props.data.id)
        .delete();
    }
    function addToList(item: string) {
      db.collection("planner")
        .doc(props.data.id)
        .update({
          items: [...props.data.items, item]
        });
    }
    function removeFromList(item: string) {
      const foundIndex = props.data.items.findIndex(el => el === item);
      db.collection("planner")
        .doc(props.data.id)
        .update({
          items: props.data.items.filter((_, index) => index !== foundIndex)
        });
    }
    const itemCount = computed(() => countBy(props.data.items));
    const distinctItems = computed(() => Object.keys(itemCount.value).sort());
    return {
      itemCount,
      distinctItems,
      addToList,
      removeFromList,
      remove
    };
  }
});
</script>

<style scoped>
.remove-list {
  float: right;
}
</style>
