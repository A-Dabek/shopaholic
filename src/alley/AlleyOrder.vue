<template>
  <div class="wrapper">
    <draggable
      v-model="alleys"
      tag="ol"
      @change="onReorder"
      fallbackTolerance="5"
    >
      <li class="alley" v-for="alleyItem of alleys" :key="alleyItem.id">
        <label>{{ alleyItem.id }}</label>
        <fa-i icon="times" @click.stop="removeAlley(alleyItem.id)"></fa-i>
      </li>
    </draggable>
    <CustomInput :placeholder="'Nowa alejka'" @submit="newAlley" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api';
import CustomInput from '@/components/Input.vue';
import draggable from 'vuedraggable';
import { Alley } from '@/alley/alley';
import { StorageService } from '@/repository/storage-service';

export default defineComponent({
  name: 'AlleyOrder',
  components: {
    CustomInput,
    draggable,
  },
  props: ['shop'],
  inject: ['shopStore'],
  setup(props: { shop: string }) {
    const storage = new StorageService();
    const alleys = ref<Alley[]>([]);
    watchEffect(() => {
      return storage.getAlleys(props.shop, data => (alleys.value = data));
    });
    const onReorder = () => {
      storage.setAlleyOrder(
        props.shop,
        alleys.value.map(a => a.id)
      );
    };
    return {
      alleys,
      newAlley: (name: string) =>
        storage.addAlley(props.shop, name, alleys.value.length),
      removeAlley: (id: string) => storage.removeAlley(props.shop, id),
      onReorder,
    };
  },
});
</script>

<style scoped>
ol {
  padding: 0;
  padding-right: 5px;
  padding-left: 5px;
}
li {
  list-style: none;
  font-size: 1.25rem;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-right: 5px;
  padding-left: 5px;
}
.alley {
  display: flex;
  align-items: baseline;
}
.alley label {
  flex-grow: 1;
}
</style>
