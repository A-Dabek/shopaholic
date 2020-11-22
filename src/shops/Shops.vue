<template>
  <div class="wrapper" v-if="!pickedShop">
    <ul class="rainbow">
      <li
        class="rainbow-arc"
        v-for="shopItem of shops"
        :key="shopItem.id"
        @click="pickedShop = shopItem.id"
      >
        <span>{{ shopItem.id }}</span>
        <fa-i icon="times" @click.stop="() => removeShop(shopItem.id)"></fa-i>
      </li>
    </ul>
    <CustomInput :placeholder="'Nowy sklep'" @submit="newShop" />
  </div>
  <alley-order v-else :shop="pickedShop" />
</template>

<script lang="ts">
import CustomInput from '../components/Input.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { StorageService } from '@/storage-service';
import AlleyOrder from './AlleyOrder.vue';

export default defineComponent({
  name: 'ShopList',
  components: {
    CustomInput,
    AlleyOrder,
  },
  firestore: {
    shops: StorageService.collections.shops,
  },
  setup() {
    const pickedShop = ref('');
    const storage = new StorageService();
    return {
      pickedShop,
      shops: ref<string[]>([]),
      newShop: (name: string) => storage.addShop(name),
      removeShop: (id: string) => storage.removeShop(id),
    };
  },
});
</script>

<style scoped></style>
