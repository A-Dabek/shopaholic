<template>
  <li>{{ item }}</li>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "ListItem",
  props: {
    item: String
  },
  setup() {
    return {};
  }
});
</script>

<style scoped>
li {
  text-align: left;
}
</style>
