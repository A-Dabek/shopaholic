<template>
  <div class="wrapper">
    <ul class="rainbow">
      <li class="rainbow-arc" v-for="shopItem of shops" :key="shopItem.id">
        <span>{{ shopItem.id }}</span>
        <fa-i icon="times" @click.stop="() => removeShop(shopItem.id)"></fa-i>
      </li>
    </ul>
    <CustomInput :placeholder="'Nowy sklep'" @submit="newShop" />
  </div>
</template>

<script lang="ts">
import CustomInput from '../components/Input.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { StorageService } from '@/storage-service';

export default defineComponent({
  name: 'ShopList',
  components: {
    CustomInput,
  },
  firestore: {
    shops: StorageService.collections.shops,
  },
  setup() {
    const storage = new StorageService();
    const shops = ref<string[]>([]);
    function newShop(name: string) {
      storage.addShop(name);
    }
    function removeShop(id: string) {
      storage.removeShop(id);
    }
    return {
      shops,
      newShop,
      removeShop,
    };
  },
});
</script>

<style scoped></style>
