<template>
  <div class="wrapper">
    <ol>
      <li v-for="list of lists" :key="list.id" aria-label="plan-list">
        <List class="rainbow-arc list" :data="list" />
      </li>
    </ol>
    <custom-input
      data-testId="list"
      placeholder="Nowa lista"
      @submit="newList"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api';
import List from './List.vue';
import CustomInput from '../../components/Input.vue';
import { PlanListRepository } from './model';

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
    const lists = repository.findAll();
    return {
      lists,
      newList: (name: string) => repository.add(name),
    };
  },
});
</script>

<style scoped>
ol {
  list-style: none;
}
ol,
li {
  margin: 0;
  padding: 0;
}
.wrapper .list {
  color: white;
  margin-bottom: 10px;
}
.wrapper input {
  width: 100%;
  padding: 2px 4px;
}
</style>
