<template>
  <li aria-label="product">
    <div class="wrapper">
      <div class="content">
        <div class="header">
          <span class="count">
            <fa-i class="plus" icon="plus" @click="add"></fa-i>
            <span class="text">{{ item.quantity }}{{ item.unit }}</span>
            <fa-i class="minus" icon="minus" @click="subtract"></fa-i>
          </span>
          <label class="name">{{ item.name }}</label>
        </div>
        <span class="details">{{ item.details }}</span>
      </div>
      <fa-i class="remove" icon="times" @click="onRemove"></fa-i>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { PlanListItem } from './model';

export default defineComponent({
  name: 'ListItem',
  props: {
    item: Object as () => PlanListItem,
  },
  setup(_, { emit }) {
    return {
      onRemove: () => emit('remove'),
      add: () => emit('add'),
      subtract: () => emit('subtract'),
    };
  },
});
</script>

<style scoped>
li {
  text-align: left;
  font-size: 1.25rem;
}

.wrapper {
  display: flex;
  align-items: center;
}

.content {
  flex-grow: 1;
}

.header {
  display: flex;
}

.remove {
  margin-left: 1rem;
}

.details {
  display: block;
  font-size: 0.9rem;
}

.count {
  display: block;
  flex-wrap: nowrap;
  flex-shrink: 0;
  margin-right: 0.25rem;
}

.count .text {
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
}

.text {
  text-transform: none;
}
</style>
