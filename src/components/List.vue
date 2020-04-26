<template>
  <ul>
    <ListItem v-for="item of items" :key="item" :item="item" />
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import ListItem from "./ListItem.vue";
export default defineComponent({
  name: "List",
  components: {
    ListItem
  },
  setup() {
    const items = reactive(["a", "b", "c"]);
    return {
      items
    };
  }
});
</script>

<style scoped>
</style>
