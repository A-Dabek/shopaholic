<template>
  <div class="wrapper">
    <ul class="rainbow">
      <li
        class="rainbow-arc"
        v-for="alleyItem of alleys"
        :key="alleyItem"
        @click="pick(alleyItem)"
      >
        <span>{{ alleyItem }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api';
import CustomInput from '@/components/Input.vue';
import { StorageService } from '@/storage-service';

export default defineComponent({
  name: 'AlleyPicker',
  props: ['shop'],
  setup(props: { shop: string }, { emit }) {
    const alleys = ref<string[]>([]);
    watchEffect(() => {
      return StorageService.collections
        .alleys(props.shop)
        .onSnapshot(snapshot => {
          alleys.value = snapshot.docs.map(doc => doc.id);
        });
    });
    return {
      alleys,
      pick: (name: string) => emit('pick', name),
    };
  },
});
</script>

<style scoped></style>
