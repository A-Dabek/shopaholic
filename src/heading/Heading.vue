<template>
  <nav class="wrapper">
    <a @click="onNavigation(screens.planner)">
      <fa-i icon="pencil-alt"></fa-i>
      <label :class="{ selected: selected === screens.planner }"
        >Planowanie</label
      >
    </a>
    <a @click="onNavigation(screens.shopping)">
      <fa-i icon="shopping-basket"></fa-i>
      <label :class="{ selected: selected === screens.shopping }">
        Zakupy</label
      >
    </a>
    <a @click="onReset">
      <fa-i icon="sync" :spin="isDirty"></fa-i>
      <label>Reset</label>
    </a>
  </nav>
</template>

<script lang="ts">
import { Screen } from './screens';
import { defineComponent, ref, computed } from '@vue/composition-api';
import { StorageService } from '@/repository/storage-service';

export default defineComponent({
  name: 'Heading',
  firestore: {
    bought: StorageService.collections.bought,
  },
  setup(_, { emit }) {
    const storage = new StorageService();
    const bought = ref<{ id: string }[]>([]);
    const isDirty = computed<boolean>(() => bought.value.length > 0);
    const selected = ref<Screen>(Screen.planner);
    function onNavigation(screen: Screen) {
      emit('navigation', screen);
      selected.value = screen;
    }
    function onReset() {
      storage.removeAllBoughtItems();
    }
    return {
      screens: Screen,
      bought,
      selected,
      onNavigation,
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
  flex-wrap: wrap;
  justify-content: space-around;
}
a {
  text-decoration: none;
  color: inherit;
  margin-right: 10px;
  margin-bottom: 5px;
}
label {
  margin-left: 5px;
}
label.selected {
  font-weight: bold;
  text-decoration: underline;
}
</style>
