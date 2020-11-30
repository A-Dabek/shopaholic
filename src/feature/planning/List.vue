<template>
  <div class="wrapper">
    <h3 class="header">
      <label class="title">{{ data.title }}</label>
      <fa-i
        class="action action-reset"
        icon="undo"
        v-if="items.length > 0"
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
        v-for="item of items"
        :key="item.name"
        :item="item"
        @remove="removeFromList(item.name)"
      />
    </ul>
    <item-form @submit="addToList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ItemForm from './ItemForm.vue';
import ListItem from './ListItem.vue';
import { PlanList } from './model';
import { useListLogic } from './useListLogic';

export default defineComponent({
  name: 'List',
  components: {
    ListItem,
    ItemForm,
  },
  props: {
    data: {
      type: Object as () => PlanList,
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
