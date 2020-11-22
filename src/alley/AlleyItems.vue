<template>
  <div class="wrapper">
    <ul class="products">
      <li v-for="product of alleyProducts" :key="product">{{ product }}</li>
    </ul>
    <ul class="available">
      <li v-for="product of availableProducts" :key="product">{{ product }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ShopPicker from '@/shops/ShopPicker.vue';
import CustomInput from '@/components/Input.vue';
import draggable from 'vuedraggable';
import { useAlleyLogic } from './useAlleyLogic';

export default defineComponent({
  name: 'AlleyItems',
  components: {},
  props: ['shop', 'alley'],
  setup(props: { shop: string; alley: string }) {
    return useAlleyLogic(props);
  },
});
</script>

<style scoped></style>
