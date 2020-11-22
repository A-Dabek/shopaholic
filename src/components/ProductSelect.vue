<template>
  <div class="wrapper">
    <input
      type="text"
      class="product-input"
      placeholder="Nowy produkt"
      v-model="productName"
      @keydown.enter="onProductSubmit"
    />
  </div>
</template>

<script lang="ts">
import { db } from '../firestore';
import { defineComponent, reactive, ref } from '@vue/composition-api';
import ListItem from './ListItem.vue';
import { useProductSelectLogic } from './useProductSelectLogic';
export default defineComponent({
  name: 'ProductSelect',
  firestore: {
    productOptions: db.collection('products'),
  },
  setup(props, { emit }) {
    return useProductSelectLogic(emit);
  },
});
</script>

<style scoped>
.wrapper {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.product-input {
  font-size: 1.25rem;
  width: 100%;
  color: white;
  padding: 2px 4px;
  border: 2px solid white;
  outline: none;
  background-color: var(--var-color);
}
.product-input::placeholder {
  color: white;
  font-style: italic;
}
option:checked {
  text-decoration: underline;
  font-weight: bold;
  color: white;
  background: var(--var-color);
}
</style>
