<template>
  <div class="wrapper">
    <h3 class="item-list-header">
      <label class="title">{{ data.title }}</label>
      <fa-i
        class="float-right action-clear"
        icon="tasks"
        v-if="items.length > 0"
        @click="clearList"
      ></fa-i>
      <fa-i
        class="float-right action-reset"
        icon="undo"
        v-if="items.length > 0"
        @click="resetList"
      ></fa-i>
      <fa-i
        class="float-right action-remove"
        icon="times"
        @click="remove(data.id)"
      ></fa-i>
    </h3>
    <ul>
      <ListItem
        v-for="item of items"
        :key="item.name"
        :item="item"
        :is-bought="bought[item.name]"
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
    bought: {
      type: Object as () => Record<string, boolean>,
      required: true,
    },
  },
  setup(props) {
    const items = computed(() => orderBy(props.data.items, item => item.name));
    const repository = inject('planListRepository') as PlanListRepository;
    return {
      items,
      clearList: function () {
        const itemsToBuy = items.value.filter(item => !props.bought[item.name]);
        StorageService.collections.toBuyList(props.data.id).update({
          items: itemsToBuy,
        });
      },
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
.wrapper {
  padding: 5px 10px;
}
.item-list-header .action-reset,
.item-list-header .action-clear {
  margin-right: 15px;
}
</style>
