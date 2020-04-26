<template>
  <ul>
    <ListItem v-for="item of items" :key="item" :item="item" />
    {{documents.map(i => i.id)}}
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/composition-api";
import ListItem from "./ListItem.vue";
import { db } from "../firestore";
export default defineComponent({
  data() {
    return {
      documents: []
    };
  },

  firestore: {
    documents: db.collection("products")
  },
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
