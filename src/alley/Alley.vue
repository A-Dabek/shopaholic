<template>
  <div>
    <shop-picker v-if="!shop" @pick="name => (shop = name)"> </shop-picker>

    <div v-else class="wrapper">
      <draggable
        v-model="alleys"
        tag="ol"
        @change="onReorder"
        fallbackTolerance="5"
      >
        <li class="alley" v-for="alleyItem of alleys" :key="alleyItem.id">
          <label>{{ alleyItem.id }}</label>
          <fa-i icon="times" @click.stop="removeAlley(alleyItem.id)"></fa-i>
        </li>
      </draggable>
      <CustomInput :placeholder="'Nowa alejka'" @submit="newAlley" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api';
import ShopPicker from '@/shops/ShopPicker.vue';
import CustomInput from '@/components/Input.vue';
import { StorageService } from '@/storage-service';
import draggable from 'vuedraggable';
import { Alley } from './alley';

export default defineComponent({
  name: 'Alley',
  components: {
    ShopPicker,
    CustomInput,
    draggable,
  },
  setup() {
    const shop = ref('');
    const storage = new StorageService();
    const alleys = ref<Alley[]>([]);
    watchEffect(() => {
      if (!shop.value) return;
      return storage.getAlleys(shop.value, data => (alleys.value = data));
    });
    const onReorder = () => {
      storage.setAlleyOrder(
        shop.value,
        alleys.value.map(a => a.id)
      );
    };
    return {
      shop,
      alleys,
      newAlley: (name: string) =>
        storage.addAlley(shop.value, name, alleys.value.length),
      removeAlley: (id: string) => storage.removeAlley(shop.value, id),
      onReorder,
    };
  },
});
</script>

<style scoped>
ol {
  padding: 0;
  padding-right: 5px;
  padding-left: 5px;
}
li {
  list-style: none;
  font-size: 1.25rem;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-right: 5px;
  padding-left: 5px;
}
.alley {
  display: flex;
  align-items: baseline;
}
.alley label {
  flex-grow: 1;
}
</style>
