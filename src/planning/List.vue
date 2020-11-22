<template>
  <div class="wrapper">
    <h3 class="header">
      <label class="title">{{ data.title }}</label>
      <fa-i
        class="action action-reset"
        icon="undo"
        v-if="distinctItems.length > 0"
        @click="resetList"
      ></fa-i>
      <fa-i
        class="action action-remove"
        icon="times"
        @click="removeList"
      ></fa-i>
    </h3>
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
    <custom-input placeholder="Kolejny produkt" @submit="addToList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ListItem from './ListItem.vue';
import CustomInput from '@/components/Input.vue';
import { ListData, useListLogic } from './useListLogic';

export default defineComponent({
  name: 'List',
  components: {
    ListItem,
    CustomInput,
  },
  props: {
    data: {
      type: Object as () => ListData,
      required: true,
    },
  },
  setup(props) {
    return useListLogic(props);
  },
});
</script>

<style scoped>
.action {
  float: right;
}
.wrapper {
  padding: 5px 10px;
}
.header {
  margin-top: 0;
  display: flex;
}
.header .title {
  flex-grow: 1;
}
.header .action-reset {
  margin-right: 15px;
}
</style>
