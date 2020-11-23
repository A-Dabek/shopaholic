<template>
  <div class="wrapper">
    <alley-picker v-if="!alley" :shop="shop" @pick="name => (alley = name)" />
    <alley-items v-else :shop="shop" :alley="alley" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import AlleyItems from './AlleyItems.vue';
import AlleyPicker from './AlleyPicker.vue';

export default defineComponent({
  name: 'Alley',
  components: {
    AlleyPicker,
    AlleyItems,
  },
  props: ['shop'],
  setup() {
    const alley = ref('');
    return {
      alley,
    };
  },
});
</script>

<style scoped></style>
