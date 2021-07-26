<template>
  <div class="wrapper">
    <h3 class="item-list-header">
      <label class="title">Ostatnio usunięte</label>
      <fa-i
        class="float-right"
        icon="undo"
        v-if="items.length > 0"
        @click="resetList"
      ></fa-i>
    </h3>

    <ul>
      <ListItem v-for="item of removed" :key="item.name" :item="item" />
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { PlanListItem } from '@/feature/planning/model';
import { StorageService } from '@/repository/storage-service';
import ListItem from '@/feature/planning/ListItem.vue';

export default defineComponent({
  name: 'Recents',
  components: {
    ListItem,
  },
  firestore: {
    removed: StorageService.collections.removed,
  },
  setup() {
    const storage = new StorageService();
    const removed = ref<{ id: string; data: PlanListItem }[]>([]);
    const items = computed(() => {
      return removed.value.map(item => item.data);
    });
    return {
      removed,
      items,
      resetList: function () {
        storage.removeAllRecentlyRemovedItems();
      },
    };
  },
});
</script>

<style scoped>
.wrapper {
  padding: 5px 10px;
}
</style>
