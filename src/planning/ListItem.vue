<template>
  <li>
    <label class="name">{{ item }}</label>
    <span class="count">
      <fa-i icon="minus" @click="decrement"></fa-i>
      <span class="text">{{ count }}</span>
      <fa-i icon="plus" @click="increment"></fa-i>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
export default defineComponent({
  name: 'ListItem',
  props: {
    item: String,
    count: Number,
  },
  setup(props, { emit }) {
    return {
      increment() {
        emit('increment');
      },
      decrement() {
        emit('decrement');
      },
    };
  },
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
.count .text {
  font-weight: bold;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
