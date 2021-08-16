<template>
  <div class="wrapper">
    <h3 class="item-list-header">
      <fa-i
        class="action-clear"
        icon="tasks"
        v-if="items.length > 0"
        @click="clearList"
      ></fa-i>
      <label class="title">{{ data.id }}</label>
      <fa-i
        class="float-right action-reset"
        icon="undo"
        v-if="items.length > 0"
        @click="resetList"
      ></fa-i>
      <fa-i
        class="float-right action-remove"
        icon="times"
        @click="remove"
      ></fa-i>
    </h3>
    <ul>
      <ListItem
        v-for="item of items"
        :key="item.id"
        :item="item"
        :is-bought="bought[item.id]"
        @remove="removeListItem(item.id)"
        @add="addQuantity(item)"
        @subtract="subtractQuantity(item)"
      />
    </ul>
    <item-form @submit="addListItem" />
  </div>
</template>

<script lang="ts">
import { Entity } from '@/repository/model';
import {
  defineComponent,
  inject,
  ref,
  watchEffect,
} from '@vue/composition-api';
import { orderBy } from 'lodash-es';
import ItemForm from './ItemForm.vue';
import ListItem from './ListItem.vue';
import { PlanList, PlanListItem } from './model';
import { PlanListRepository } from '@/feature/planning/plan-list-repository';

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
    const repository = inject('planListRepository') as PlanListRepository;
    const service = repository.forList(props.data.id);
    const items = ref<(PlanListItem & Entity)[]>([]);

    watchEffect(() => {
      return service.collection.onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as PlanListItem),
        }));
        items.value = orderBy(data, 'id');
      });
    });
    return {
      items,
      clearList: () => service.clearBought(),
      resetList: () => service.clear(),
      remove: () => repository.remove(props.data.id),
      addListItem: (item: PlanListItem & Entity) => service.add(item.id, item),
      removeListItem: (item: string) => service.remove(item),
      addQuantity: (item: PlanListItem & Entity) =>
        service.add(item.id, {
          ...item,
          quantity: item.quantity + 1,
        }),
      subtractQuantity: (item: PlanListItem & Entity) =>
        service.add(item.id, {
          ...item,
          quantity: item.quantity - 1,
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
