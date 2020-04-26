<template>
  <div class="wrapper">
    <List class="list" v-for="list of lists" :key="list.id" :data="list" />
    <input placeholder="Nowa lista" v-model="newListTitle" @keydown.enter="newList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import List from "./List.vue";
import ProductSelect from "./ProductSelect.vue";
import { db } from "../firestore";

export default defineComponent({
  name: "Planner",
  components: {
    List
  },
  firestore: {
    lists: db.collection("planner")
  },
  setup() {
    const newListTitle = ref("");
    const lists = ref([]);
    function newList() {
      db.collection("planner").add({ title: newListTitle.value, items: [] });
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
.wrapper input {
  margin-top: 20px;
  width: 100%;
}
</style>
