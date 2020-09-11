<template>
  <li>
    <label class="name">{{ item }}</label>
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
    item: String,
    count: Number
  },
  setup(props, {emit}) {
    return {
      increment() {
        emit('increment');
      },
      decrement() {
        emit('decrement');
      }
    };
  }
});
</script>

<style scoped>
li {
  text-align: left;
  font-size: 1.25rem;
}
.count {
  float: right;
}
</style>
