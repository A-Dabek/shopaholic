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
    const lists = ref([]);
    const newListTitle = ref("");
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
.wrapper .list {
  color: white;
  margin-bottom: 10px;
}
.wrapper input {
  width: 100%;
  padding: 2px 4px;
}
input::placeholder {
  font-style: italic;
}
.wrapper .list:nth-child(5n + 1) {
  background: #dce775;
  --var-color: #dce775;
}
.wrapper .list:nth-child(5n + 2) {
  background: #4db6ac;
  --var-color: #4db6ac;
}
.wrapper .list:nth-child(5n + 3) {
  background: #a1887f;
  --var-color: #a1887f;
}
.wrapper .list:nth-child(5n + 4) {
  background: #f3cc74;
  --var-color: #f3cc74;
}
.wrapper .list:nth-child(5n) {
  background: #e08a8a;
  --var-color: #e08a8a;
}
</style>
