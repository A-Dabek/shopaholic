<template>
  <main id="app">
    <Heading class="header" @navigation="onNavigation" />
    <Planner v-if="screen === screens.planner" />
    <Shopping v-else />
    <div class="recents">
      <Recents />
    </div>
  </main>
</template>

<script lang="ts">
import { Screen } from './heading/screens';
import Heading from './heading/Heading.vue';
import { defineComponent, provide, ref } from '@vue/composition-api';
import Shopping from './components/Shopping.vue';
import Planner from './feature/planning/Planner.vue';
import Recents from '@/components/Recents.vue';
import './styles.css';
import { PlanListRepository } from '@/feature/planning/plan-list-repository';

export default defineComponent({
  name: 'App',
  components: {
    Recents,
    Shopping,
    Heading,
    Planner,
  },
  setup() {
    provide('planListRepository', new PlanListRepository());
    const screen = ref(Screen.planner);
    return {
      screens: Screen,
      screen,
      onNavigation: (newScreen: Screen) => {
        screen.value = newScreen;
      },
    };
  },
});
</script>
