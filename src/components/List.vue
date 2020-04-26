<template>
  <div>
    <label>
      <span>{{ data.title }}</span>
      <fa-i class="remove-list" icon="times" @click="removeList"></fa-i>
    </label>
    <ul>
      <ListItem
        v-for="item of distinctItems"
        :key="item"
        :item="item"
        :count="itemCount[item]"
        @increment="() => addToList(item)"
        @decrement="() => removeFromList(item)"
      />
    </ul>
    <ProductSelect @select="addToList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ListItem from "./ListItem.vue";
import ProductSelect from "./ProductSelect.vue";
import { ListData, useListLogic } from './useListLogic';

export default defineComponent({
  name: "List",
  components: {
    ListItem,
    ProductSelect
  },
  props: {
    data: {
      type: Object as () => ListData,
      required: true
    }
  },
  setup(props) {
    return useListLogic(props);
  }
});
</script>

<style scoped>
.remove-list {
  float: right;
}
</style>
