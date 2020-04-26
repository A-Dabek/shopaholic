<template>
  <div>
    <select @change="onChange">
      <option
        v-for="product of productOptions"
        :value="product.id"
        :key="product.id"
      >{{ product.id }}</option>
    </select>
    <input placeholder="Produkt" v-model="productName" @keydown.enter="onProductSubmit" />
  </div>
</template>

<script lang="ts">
import { db } from "../firestore";
import { defineComponent, reactive, ref } from "@vue/composition-api";
import ListItem from "./ListItem.vue";
import { useProductSelectLogic } from "./useProductSelectLogic";
export default defineComponent({
  name: "ProductSelect",
  firestore: {
    productOptions: db.collection("products")
  },
  setup(props, { emit }) {
    return useProductSelectLogic(emit);
  }
});
</script>

<style scoped>
</style>
