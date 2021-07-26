<template>
  <div class="wrapper">
    <List
      v-for="list of lists"
      :key="list.title"
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
import { computed, defineComponent, inject } from '@vue/composition-api';
import List from './List.vue';
import CustomInput from '../../components/Input.vue';
import { PlanListRepository } from './model';
import _ from 'lodash';

export default defineComponent({
  name: 'Planner',
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
    return {
      lists,
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
