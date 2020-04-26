<template>
  <div id="app">
    <Planner />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Planner from "./components/Planner.vue";

export default Vue.extend({
  name: "App",
  components: {
    Planner
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
