<template>
  <div class="wrapper">
    <Shopping v-if="!!shop" :shopName="shop" />
    <ul class="rainbow" v-else>
      <li
        class="rainbow-arc"
        v-for="shopItem of shops"
        :key="shopItem.id"
        @click="shop = shopItem.id"
      >
        <span>{{ shopItem.id }}</span>
        <fa-i icon="times" @click.stop="() => removeShop(shopItem.id)"></fa-i>
      </li>
    </ul>
    <input
      placeholder="Nowy sklep"
      v-model="newShopName"
      @keydown.enter="newShop"
    />
  </div>
</template>

<script lang="ts">
import Shopping from './Shopping.vue';
import { defineComponent, ref } from '@vue/composition-api';
import { db } from '../firestore';

export default defineComponent({
  name: 'ShopList',
  components: {
    Shopping,
  },
  firestore: {
    shops: db.collection('shops'),
  },
  setup() {
    const shop = ref('');
    const shops = ref<string[]>([]);
    const newShopName = ref('');
    function newShop() {
      if (!newShopName.value) return;
      db.collection('shops').doc(newShopName.value).set({});
      newShopName.value = '';
    }
    function removeShop(id: string) {
      db.collection('shops').doc(id).delete();
    }
    return {
      shop,
      shops,
      newShopName,
      newShop,
      removeShop,
    };
  },
});
</script>

<style scoped>
.wrapper input {
  width: 100%;
  padding: 2px 4px;
}
input::placeholder {
  font-style: italic;
}
ul {
  list-style: inside;
  padding: 0;
}
</style>
