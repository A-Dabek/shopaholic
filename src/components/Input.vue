<template>
  <div class="wrapper">
    <input :placeholder="placeholder" v-model="value" @keydown.enter="submit" />
    <fa-i class="icon" icon="plus" @click="submit"></fa-i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import List from './List.vue';
import ProductSelect from './ProductSelect.vue';

export default defineComponent({
  name: 'CustomInput',
  props: ['placeholder'],
  setup(props: { placeholder: string }, { emit }) {
    const value = ref('');
    return {
      value,
      submit: () => {
        emit('submit', value.value.trim());
        value.value = '';
      },
    };
  },
});
</script>

<style scoped>
.wrapper {
  color: grey;
  display: flex;
  align-items: center;
  background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
  border-width: 2px;
  border-style: inset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
}
.wrapper input {
  width: 100%;
  padding: 6px 4px;
  outline: none !important;
  border: none;
}
input::placeholder {
  font-style: italic;
}
.wrapper .icon {
  margin-left: 1rem;
  margin-right: 0.5rem;
}
</style>
