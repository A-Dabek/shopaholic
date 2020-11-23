<template>
  <div class="wrapper">
    <ol>
      <li
        v-for="(item, index) of orderedItemsToBuy"
        :key="item.name"
        class="shopping-item"
      >
        <label
          class="shopping-item-wrapper rainbow-arc"
          @click="onItemClick(item.name)"
        >
          <span>{{ index + 1 }}. {{ item.name }}</span>
          <span class="count">{{ item.quantity }}{{ item.unit }}</span>
          <span class="details">{{ item.details }}</span>
        </label>
      </li>
    </ol>

    <ul>
      <li
        v-for="item of boughtItems"
        :key="item.id"
        class="shopping-item bought"
      >
        <label
          class="shopping-item-wrapper rainbow-arc"
          @click="onItemClick(item.name)"
        >
          <span>{{ item.name }}</span>
          <span class="count">{{ item.quantity }}{{ item.unit }}</span>
          <span class="details">{{ item.details }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  watchEffect,
} from '@vue/composition-api';
import { db } from '../firestore';
import { flatten, orderBy } from 'lodash-es';
import { useBoughtLogic } from './useBoughtLogic';
import { ItemToBuy } from '@/planning/item-to-buy';
import { StorageService } from '@/storage-service';
import { Alley } from '@/alley/alley';

export default defineComponent({
  name: 'Shopping',
  props: {
    shop: {
      type: String,
      required: true,
    },
  },
  firestore: {
    bought: db.collection('bought'),
  },
  setup(props) {
    const alleys = ref<Alley[]>([]);
    watchEffect(() => {
      return StorageService.collections
        .alleys(props.shop)
        .onSnapshot(snapshot => {
          alleys.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Alley[];
          alleys.value = orderBy(alleys.value, a => a.order);
        });
    });

    const planned = ref<ItemToBuy[]>([]);
    onMounted(() => {
      StorageService.collections.planner.get().then(snapshot => {
        planned.value = flatten(
          snapshot.docs.map(doc => doc.data().items)
        ) as ItemToBuy[];
      });
    });

    const bought = ref<{ id: string }[]>([]);
    const boughtDict = computed<{ [k: string]: boolean }>(() =>
      bought.value
        .map(data => data.id)
        .reduce((prev, curr) => ({ ...prev, [curr]: true }), {})
    );

    const boughtItems = computed(() => {
      return planned.value.filter(item => boughtDict.value[item.name]);
    });

    const orderedItemsToBuy = computed(() => {
      const itemsToBuy = planned.value.filter(
        item => !bought.value.some(b => b.id === item.name)
      );
      return orderBy(itemsToBuy, item =>
        alleys.value.findIndex(a => a.items.includes(item.name))
      );
    });

    return {
      alleys,
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
li.bought {
  text-decoration: line-through;
}
.shopping-item-wrapper {
  display: block;
}
.count {
  float: right;
  font-weight: bold;
}
.details {
  display: block;
  font-size: 0.9rem;
}
</style>
