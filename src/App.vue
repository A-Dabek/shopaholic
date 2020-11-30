<template>
  <main id="app">
    <Heading class="header" @navigation="onNavigation" />
    <Shops v-if="screen === screens.shops" />
    <alley-order
      v-else-if="screen === screens.alleys"
      :shop="shopStore.state.shop"
    />
    <Alley
      v-else-if="screen === screens.products"
      :shop="shopStore.state.shop"
    />
    <planner v-else-if="screen === screens.planner" />
    <Shopping
      v-else-if="screen === screens.shopping"
      :shop="shopStore.state.shop"
    />
  </main>
</template>

<script lang="ts">
import { Screen } from './heading/screens';
import Heading from './heading/Heading.vue';
import { defineComponent, provide, ref } from '@vue/composition-api';
import Alley from './alley/Alley.vue';
import AlleyOrder from './alley/AlleyOrder.vue';
import Shopping from './components/Shopping.vue';
import Shops from './feature/shops/Shops.vue';
import { ShopRepositoryFirestore } from './repository/shop-repository-firestore';
import Planner from './feature/planning/Planner.vue';
import { PlanListRepositoryFirestore } from './repository/plan-list-repository-firestore';

export default defineComponent({
  name: 'App',
  components: {
    Alley,
    Shopping,
    Heading,
    Shops,
    AlleyOrder,
    Planner,
  },
  inject: ['shopStore'],
  setup() {
    provide('shopRepository', new ShopRepositoryFirestore());
    provide('planListRepository', new PlanListRepositoryFirestore());
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
li {
  text-transform: capitalize;
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
input::placeholder {
  font-style: italic;
}
</style>
