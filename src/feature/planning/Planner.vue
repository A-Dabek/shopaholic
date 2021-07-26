<template>
  <div class="wrapper">
    <List
      v-for="list of lists"
      :key="list.title"
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
import { PlanListRepository } from './model';
import _ from 'lodash';
import { StorageService } from '@/repository/storage-service';

export default defineComponent({
  name: 'Planner',
  firestore: {
    bought: StorageService.collections.bought,
  },
  components: {
    List,
    CustomInput,
  },
  setup() {
    const repository = inject<PlanListRepository>(
      'planListRepository'
    ) as PlanListRepository;

    const lists = computed(() => {
      const lists = repository.findAll();
      return _.sortBy(lists.value, 'time');
    });

    const bought = ref<{ id: string }[]>([]);
    const boughtDict = computed<{ [k: string]: boolean }>(() =>
      bought.value
        .map(data => data.id)
        .reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
    );
    return {
      lists,
      bought,
      boughtDict,
      newList: (name: string) => repository.add(name),
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
