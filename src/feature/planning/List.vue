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
        @click="remove(data.id)"
      ></fa-i>
    </h3>
    <ul>
      <ListItem
        v-for="item of items"
        :key="item.name"
        :item="item"
        @remove="removeListItem(item.name)"
        @add="addQuantity(item)"
        @subtract="subtractQuantity(item)"
      />
    </ul>
    <item-form @submit="addListItem" />
  </div>
</template>

<script lang="ts">
import { Entity } from '@/repository/model';
import { StorageService } from '@/repository/storage-service';
import { computed, defineComponent, inject } from '@vue/composition-api';
import { orderBy } from 'lodash-es';
import ItemForm from './ItemForm.vue';
import ListItem from './ListItem.vue';
import { PlanList, PlanListItem, PlanListRepository } from './model';

export default defineComponent({
  name: 'List',
  components: {
    ListItem,
    ItemForm,
  },
  props: {
    data: {
      type: Object as () => PlanList & Entity,
      required: true,
    },
  },
  setup(props) {
    const items = computed(() => orderBy(props.data.items, item => item.name));
    const repository = inject('planListRepository') as PlanListRepository;
    return {
      items,
      resetList: function () {
        StorageService.collections.toBuyList(props.data.id).update({
          items: [],
        });
      },
      remove: (id: string) => repository.remove(id),
      addListItem: (item: PlanListItem) =>
        repository.addListItem(props.data.title, item),
      removeListItem: (item: string) =>
        repository.removeListItem(props.data.title, item),
      addQuantity: (item: PlanListItem) =>
        repository.changeListItem(props.data.title, {
          ...item,
          quantity: item.quantity + 1,
        }),
      subtractQuantity: (item: PlanListItem) =>
        repository.changeListItem(props.data.title, {
          ...item,
          quantity: Math.max(item.quantity - 1, 1),
        }),
    };
  },
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 5px;
}
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
