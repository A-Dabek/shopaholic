<template>
  <div class="wrapper">
    <div class="products">
      <h1>Produkty w alejce</h1>
      <ul class="list">
        <li
          v-for="product of alleyProducts"
          :key="product"
          @click="removeFromAlley(product)"
        >
          <label>
            <fa-i class="icon" icon="times"></fa-i>
            <span>{{ product }}</span></label
          >
          <fa-i icon="trash" @click.stop="removeProduct(product)"></fa-i>
        </li>
      </ul>
    </div>

    <div class="products">
      <h1>Dostępne produkty</h1>
      <ul class="list">
        <li
          v-for="product of availableProducts"
          :key="product"
          @click="addToAlley(product)"
        >
          <label>
            <fa-i class="icon" icon="plus"></fa-i>
            <span>"{{ product }}"</span>
          </label>

          <fa-i icon="trash" @click.stop="removeProduct(product)"></fa-i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CustomInput from '@/components/Input.vue';
import draggable from 'vuedraggable';
import { useAlleyLogic } from './useAlleyLogic';

export default defineComponent({
  name: 'AlleyItems',
  props: ['shop', 'alley'],
  setup(props: { shop: string; alley: string }) {
    return useAlleyLogic(props);
  },
});
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin: 0;
  margin-bottom: 1rem;
}
.list {
  columns: 2;
  padding: 0;
}
.products li {
  display: flex;
  justify-content: space-between;
}
.icon {
  margin-right: 0.5rem;
}
</style>
