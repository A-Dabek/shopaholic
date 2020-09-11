<template>
  <div class="wrapper">
    <div class="planning" @click="onPlanning">
      <fa-i icon="list-ul"></fa-i>
      <label :class="{'selected': selected === 1}">Planowanie</label>
    </div>
    <div class="shopping" @click="onShopping">
      <fa-i icon="list-ol"></fa-i>
      <label :class="{'selected': selected === 2}">Zakupy</label>
    </div>
    <div class="reset" @click="onReset">
      <fa-i icon="sync" :spin="isDirty"></fa-i>
      <label>Reset</label>
    </div>
  </div>
</template>

<script lang="ts">
import Planner from "./components/Planner.vue";
import Shopping from "./components/Shopping.vue";
import { defineComponent, ref, computed } from "@vue/composition-api";
import { db } from "../firestore";

export default defineComponent({
  name: "Heading",
  firestore: {
    bought: db.collection("bought"),
  },
  setup(props, { emit }) {
    const bought = ref<{ id: string }[]>([]);
    const isDirty = computed<boolean>(() => bought.value.length > 0);

    const selected = ref(1);
    function onPlanning() {
      emit("planning");
      selected.value = 1;
    }
    function onShopping() {
      emit("shopping");
      selected.value = 2;
    }
    function onReset() {
      db.collection("bought")
        .get()
        .then((collection) => {
          collection.docs.forEach((doc) =>
            db.collection("bought").doc(doc.id).delete()
          );
        });
    }
    return {
      bought,
      selected,
      onPlanning,
      onShopping,
      onReset,
      isDirty,
    };
  },
});
</script>

<style scoped>
.wrapper {
  font-size: 1.1rem;
  padding: 0px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
}
label {
  margin-left: 5px;
}
label.selected {
  font-weight: bold;
  text-decoration: underline;
}
</style>
