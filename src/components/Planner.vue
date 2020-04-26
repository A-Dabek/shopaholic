<template>
  <div>
    <List v-for="list of lists" :key="list" :title="list" />
    <input placeholder="Nowa lista" v-model="newListTitle" @keydown.enter="newList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import List from "./List.vue";
import ProductSelect from "./ProductSelect.vue";
export default defineComponent({
  name: "Planner",
  components: {
    List
  },
  setup() {
    const newListTitle = ref("");
    const lists = ref(["Default list"]);
    function newList() {
      lists.value = [...lists.value, newListTitle.value];
      newListTitle.value = "";
    }
    return {
      lists,
      newList,
      newListTitle
    };
  }
});
</script>

<style scoped>
</style>
