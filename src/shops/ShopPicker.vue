<template>
  <div class="wrapper">
    <ul class="rainbow">
      <li
        class="rainbow-arc"
        v-for="shopItem of shops"
        :key="shopItem.id"
        @click="pick(shopItem.id)"
      >
        <span>{{ shopItem.id }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { StorageService } from '@/storage-service';

export default defineComponent({
  name: 'ShopPicker',
  firestore: {
    shops: StorageService.collections.shops,
  },
  setup(props, { emit }) {
    const shops = ref<string[]>([]);
    return {
      shops,
      pick: (name: string) => emit('pick', name),
    };
  },
});
</script>

<style scoped></style>
