<template>
  <li>
    <div class="wrapper">
      <div class="content">
        <label class="name">{{ item.name }}</label>
        <span class="count">
          <span class="text">{{ item.quantity }}{{ item.unit }}</span>
        </span>
        <span class="details">{{ item.details }}</span>
      </div>
      <fa-i class="remove" icon="times" @click="onRemove"></fa-i>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { ItemToBuy } from './item-to-buy';
export default defineComponent({
  name: 'ListItem',
  props: {
    item: Object as () => ItemToBuy,
  },
  setup(props, { emit }) {
    return {
      onRemove: () => emit('remove'),
    };
  },
});
</script>

<style scoped>
li {
  text-align: left;
  font-size: 1.25rem;
}
.content {
  flex-grow: 1;
}
.wrapper {
  display: flex;
  align-items: center;
}
.remove {
  margin-left: 1rem;
}
.details {
  display: block;
  font-size: 0.9rem;
}
.count {
  float: right;
}
.count .text {
  font-weight: bold;
  padding-left: 5px;
  padding-right: 5px;
}
.text {
  text-transform: none;
}
</style>
