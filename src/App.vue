<template>
  <main id="app">
    <Heading class="header" @navigation="onNavigation" />
    <Planner v-if="screen === screens.planner" />
    <ShopList v-else-if="screen === screens.shopping" />
  </main>
</template>

<script lang="ts">
import { Screen } from './heading/screens';
import ShopList from './components/ShopList.vue';
import Planner from './components/Planner.vue';
import Heading from './heading/Heading.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'App',
  components: {
    ShopList,
    Planner,
    Heading,
  },
  setup() {
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

<style>
#app {
  padding: 20px;
}
:root {
  --var-color: white;
}
</style>
