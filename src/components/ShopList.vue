<template>
  <div class="wrapper">
    <Shopping v-if="!!shop" :shopName="shop" />
    <ul v-else>
      <li v-for="shopItem of shops" :key="shopItem.id" @click="shop = shopItem.id">
        <span>{{shopItem.id}}</span>
        <fa-i icon="times" @click.stop="() => removeShop(shopItem.id)"></fa-i>
      </li>
    </ul>
    <input placeholder="Nowy sklep" v-model="newShopName" @keydown.enter="newShop" />
  </div>
</template>

<script lang="ts">
import Shopping from "./Shopping.vue";
import { defineComponent, ref } from "@vue/composition-api";
import { db } from "../firestore";

export default defineComponent({
  name: "ShopList",
  components: {
    Shopping
  },
  firestore: {
    shops: db.collection("shops")
  },
  setup() {
    const shop = ref("");
    const shops = ref<string[]>([]);
    const newShopName = ref("");
    function newShop() {
      if (!newShopName.value) return;
      db.collection("shops")
        .doc(newShopName.value)
        .set({});
      newShopName.value = "";
    }
    function removeShop(id: string) {
      db.collection("shops")
        .doc(id)
        .delete();
    }
    return {
      shop,
      shops,
      newShopName,
      newShop,
      removeShop
    };
  }
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
li {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  color: white;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px 10px;
}
li:nth-child(5n + 1) {
  background: #dce775;
  --var-color: #dce775;
}
li:nth-child(5n + 2) {
  background: #4db6ac;
  --var-color: #4db6ac;
}
li:nth-child(5n + 3) {
  background: #a1887f;
  --var-color: #a1887f;
}
li:nth-child(5n + 4) {
  background: #f3cc74;
  --var-color: #f3cc74;
}
li:nth-child(5n) {
  background: #e08a8a;
  --var-color: #e08a8a;
}
</style>
