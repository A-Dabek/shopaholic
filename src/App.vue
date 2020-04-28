<template>
  <div id="app">
    <Heading class="header" @planning="planning=true" @shopping="planning=false" />
    <Planner v-if="planning" />
    <shopping v-else />
  </div>
</template>

<script lang="ts">
import Planner from "./components/Planner.vue";
import Shopping from "./components/Shopping.vue";
import Heading from "./components/Heading.vue";
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "App",
  components: {
    Planner,
    Shopping,
    Heading
  },
  setup() {
    const planning = ref(true);
    return {
      planning
    };
  }
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
