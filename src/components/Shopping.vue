<template>
  <div class="wrapper">
    <ul>
      <li
        v-for="item of orderedItemsToBuy"
        :key="item.id"
        class="shopping-item"
      >
        <label
          class="shopping-item-wrapper rainbow-arc"
          @click="onItemClick(item.id)"
        >
          <span class="count">{{ item.quantity }}{{ item.unit }}</span>
          <span>{{ item.id }}</span>
          <span class="details">{{ item.details }}</span>
        </label>
      </li>
    </ul>

    <ul>
      <li
        v-for="item of boughtItems"
        :key="item.id"
        class="shopping-item bought"
      >
        <label
          class="shopping-item-wrapper rainbow-arc"
          @click="onItemClick(item.id)"
        >
          <span class="count">{{ item.quantity }}{{ item.unit }}</span>
          <span>{{ item.id }}</span>
          <span class="details">{{ item.details }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from '@vue/composition-api';
import { flatten } from 'lodash-es';
import { useBoughtLogic } from './useBoughtLogic';
import { StorageService } from '@/repository/storage-service';
import { PlanListItem } from '@/feature/planning/model';
import { Entity } from '@/repository/model';

export default defineComponent({
  name: 'Shopping',
  firestore: {
    bought: StorageService.collections.bought,
  },
  setup() {
    const planned = ref<(PlanListItem & Entity)[]>([]);
    onMounted(() => {
      StorageService.collections.lists.get().then(async snapshot => {
        const refs = snapshot.docs.map(doc =>
          StorageService.collections.toBuyList(doc.id).get()
        );
        const snapshots = await Promise.all(refs);
        const listOfItemLists = snapshots.map(snapshot =>
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as PlanListItem),
          }))
        );
        planned.value = flatten(listOfItemLists) as (PlanListItem & Entity)[];
      });
    });

    const bought = ref<{ id: string }[]>([]);
    const boughtDict = computed<{ [k: string]: boolean }>(() =>
      bought.value
        .map(data => data.id)
        .reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
    );

    const boughtItems = computed(() => {
      return planned.value.filter(item => boughtDict.value[item.id]);
    });

    const orderedItemsToBuy = computed(() => {
      return planned.value.filter(
        item => !bought.value.some(b => b.id === item.id)
      );
    });

    return {
      planned,
      bought,
      boughtDict,
      boughtItems,
      orderedItemsToBuy,
      ...useBoughtLogic(boughtDict),
    };
  },
});
</script>

<style scoped>
.wrapper {
  border-left: 1.75rem double grey;
  border-right: 1.75rem double grey;
}
ol,
ul {
  padding: 0 5px;
  list-style-type: none;
}
li {
  list-style: none;
  font-size: 1.25rem;
  padding: 5px;
}
li.bought {
  text-decoration: line-through;
}
.shopping-item-wrapper {
  padding-left: 5px;
  display: block;
}
.count {
  margin-right: 10px;
  font-weight: bold;
}
.details {
  display: block;
  font-size: 0.9rem;
}
</style>
