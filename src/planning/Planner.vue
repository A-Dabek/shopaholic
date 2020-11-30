<template>
  <div class="wrapper">
    <List
      class="rainbow-arc list"
      v-for="list of lists"
      :key="list.id"
      :data="list"
    />
    <CustomInput placeholder="Nowa lista" @submit="newList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import List from './List.vue';
import CustomInput from '../components/Input.vue';
import { StorageService } from '@/repository/storage-service';

export default defineComponent({
  name: 'Planner',
  components: {
    List,
    CustomInput,
  },
  firestore: {
    lists: StorageService.collections.planner,
  },
  setup() {
    const storage = new StorageService();
    const lists = ref([]);
    function newList(name: string) {
      storage.addPlannerList(name);
    }
    return {
      lists,
      newList,
    };
  },
});
</script>

<style scoped>
.wrapper .list {
  color: white;
  margin-bottom: 10px;
}
.wrapper input {
  width: 100%;
  padding: 2px 4px;
}
input::placeholder {
  font-style: italic;
}
</style>
