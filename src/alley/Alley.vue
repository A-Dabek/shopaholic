<template>
  <div class="wrapper">
    <shop-picker v-if="!shop" @pick="name => (shop = name)" />
    <alley-picker
      v-else-if="shop && !alley"
      :shop="shop"
      @pick="name => (alley = name)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import ShopPicker from '../shops/ShopPicker.vue';
import AlleyPicker from './AlleyPicker.vue';

export default defineComponent({
  name: 'Alley',
  components: {
    ShopPicker,
    AlleyPicker,
  },
  setup() {
    const shop = ref('');
    const alley = ref('');
    return {
      shop,
      alley,
    };
  },
});
</script>

<style scoped></style>
