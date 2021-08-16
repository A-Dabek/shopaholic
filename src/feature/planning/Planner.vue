<template>
  <div class="wrapper">
    <List
      v-for="list of sortedLists"
      :key="list.id"
      :bought="boughtDict"
      class="rainbow-arc list"
      :data="list"
      role="listitem"
      aria-label="plan-list"
    />
    <custom-input
      aria-label="new list"
      placeholder="Nowa lista"
      @submit="newList"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from '@vue/composition-api';
import List from './List.vue';
import CustomInput from '../../components/Input.vue';
import _ from 'lodash';
import { StorageService } from '@/repository/storage-service';
import { PlanListRepository } from '@/feature/planning/plan-list-repository';

export default defineComponent({
  name: 'Planner',
  firestore: {
    bought: StorageService.collections.bought,
    lists: StorageService.collections.lists,
  },
  components: {
    List,
    CustomInput,
  },
  setup() {
    const repository = inject<PlanListRepository>(
      'planListRepository'
    ) as PlanListRepository;

    const lists = ref<{ id: string; time: number }[]>([]);
    const sortedLists = computed(() => _.sortBy(lists.value, 'timestamp'));

    const bought = ref<{ id: string }[]>([]);
    const boughtDict = computed(() =>
      bought.value
        .map(data => data.id)
        .reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
    );
    return {
      lists,
      sortedLists,
      bought,
      boughtDict,
      newList: (name: string) => repository.create(name),
    };
  },
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
</style>
