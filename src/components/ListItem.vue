<template>
  <li>
    <span class="name">{{ item }}</span>
    <span class="count">
      <fa-i icon="minus" @click=decrement></fa-i>
      {{ count }}
      <fa-i icon="plus" @click=increment></fa-i>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import { db } from "../firestore";
export default defineComponent({
  name: "ListItem",
  props: {
    item: String
  },
  setup() {
    const count = ref(1);
    return {
      count,
      increment() {
        count.value += 1;
      },
      decrement() {
        count.value -= 1;
      }
    };
  }
});
</script>

<style scoped>
li {
  text-align: left;
}
.count {
  float: right;
}
</style>
