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
  display: flex;
  align-items: baseline;
}
.wrapper input {
  width: 100%;
  padding: 2px 4px;
}
input::placeholder {
  font-style: italic;
}
.wrapper .icon {
  margin-left: 1rem;
}
</style>
