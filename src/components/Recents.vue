<template>
  <div class="wrapper">
    <h3 class="header">
      <label class="title">Ostatnio usunięte</label>
      <fa-i
        class="action action-reset"
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
    const removed = ref<{ id: string; data: PlanListItem }[]>([]);
    const items = computed(() => {
      return removed.value.map(item => item.data);
    });
    return {
      removed,
      items,
      resetList: function () {
        StorageService.collections.removed.get().then(collection => {
          collection.docs.forEach(doc =>
            StorageService.collections.removed.doc(doc.id).delete()
          );
        });
      },
    };
  },
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 5px;
}
.action {
  float: right;
}
.wrapper {
  padding: 5px 10px;
}
.header {
  margin-top: 0;
  display: flex;
}
.header .title {
  flex-grow: 1;
}
</style>
