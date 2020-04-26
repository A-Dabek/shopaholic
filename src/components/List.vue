<template>
  <div>
    <ul>
      <ListItem v-for="item of items" :key="item" :item="item" />
    </ul>
    <ProductSelect @select="addToItems"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import ListItem from "./ListItem.vue";
import ProductSelect from "./ProductSelect.vue";
import { db } from "../firestore";
export default defineComponent({
  name: "List",
  components: {
    ListItem,
    ProductSelect
  },
  setup() {
    const items = reactive(["a", "b", "c"]);
    function addToItems(item: string) {
        items.push(item);
    }
    return {
      items,
      addToItems
    };
  }
});
</script>

<style scoped>
</style>
