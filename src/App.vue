<template>
  <div id="app">
    <List/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import List from "./components/List.vue";

export default Vue.extend({
  name: "App",
  components: {
    List
  }
});
</script>

<style>
#app {
}
</style>
