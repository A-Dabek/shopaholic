<template>
  <select @change="onChange">
    <option v-for="product of products" :value="product.id" :key="product.id">{{ product.id }}</option>
  </select>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import ListItem from "./ListItem.vue";
import { db } from "../firestore";
export default defineComponent({
  name: "ProductSelect",
  firestore: {
    products: db.collection("products")
  },
  setup(props, { emit }) {
    const products = reactive([]);
    function onChange(event: Event) {
      emit("select", (event.target as HTMLSelectElement).value);
    }
    return {
      products,
      onChange
    };
  }
});
</script>

<style scoped>
</style>
