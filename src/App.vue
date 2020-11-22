<template>
  <main id="app">
    <Heading class="header" @navigation="onNavigation" />
    <Planner v-if="screen === screens.planner" />
    <ShopList v-else-if="screen === screens.shopping" />
    <Shops v-else-if="screen === screens.shops" />
  </main>
</template>

<script lang="ts">
import { Screen } from './heading/screens';
import ShopList from './components/ShopList.vue';
import Planner from './planning/Planner.vue';
import Heading from './heading/Heading.vue';
import { defineComponent, ref } from '@vue/composition-api';
import Shops from './shops/Shops.vue';

export default defineComponent({
  name: 'App',
  components: {
    ShopList,
    Planner,
    Heading,
    Shops,
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
ul.rainbow {
  list-style: inside;
  padding: 0;
}
li.rainbow-arc {
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  color: white;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px 10px;
}
.rainbow-arc:nth-child(5n + 1) {
  background: #dce775;
  --var-color: #dce775;
}
.rainbow-arc:nth-child(5n + 2) {
  background: #4db6ac;
  --var-color: #4db6ac;
}
.rainbow-arc:nth-child(5n + 3) {
  background: #a1887f;
  --var-color: #a1887f;
}
.rainbow-arc:nth-child(5n + 4) {
  background: #f3cc74;
  --var-color: #f3cc74;
}
.rainbow-arc:nth-child(5n) {
  background: #e08a8a;
  --var-color: #e08a8a;
}
</style>
