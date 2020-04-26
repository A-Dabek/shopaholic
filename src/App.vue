<template>
  <div id="app">
    <Shopping />
    <Planner />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Planner from "./components/Planner.vue";
import Shopping from "./components/Shopping.vue";

export default Vue.extend({
  name: "App",
  components: {
    Planner,
    Shopping
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
