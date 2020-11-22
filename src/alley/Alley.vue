<template>
  <div>
    <shop-picker v-if="!shop" @pick="name => (shop = name)"> </shop-picker>

    <div v-else class="wrapper">
      <ul class="rainbow">
        <li class="rainbow-arc" v-for="alleyItem of alleys" :key="alleyItem.id">
          <span>{{ alleyItem.id }}</span>
          <fa-i icon="times" @click.stop="removeAlley(alleyItem.id)"></fa-i>
        </li>
      </ul>
      <CustomInput :placeholder="'Nowa alejka'" @submit="newAlley" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api';
import ShopPicker from '@/shops/ShopPicker.vue';
import CustomInput from '@/components/Input.vue';
import { StorageService } from '@/storage-service';

export default defineComponent({
  name: 'Alley',
  components: {
    ShopPicker,
    CustomInput,
  },
  setup() {
    const shop = ref('');
    const storage = new StorageService();
    const alleys = ref<{ id: string }[]>([]);
    watchEffect(() => {
      if (!shop.value) return;
      return storage.getAlleys(shop.value).onSnapshot(snapshot => {
        alleys.value = snapshot.docs as { id: string }[];
      });
    });
    return {
      shop,
      alleys,
      newAlley: (name: string) => storage.addAlley(shop.value, name),
      removeAlley: (id: string) => storage.removeAlley(shop.value, id),
    };
  },
});
</script>

<style scoped></style>
