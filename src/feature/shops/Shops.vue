<template>
  <div class="wrapper">
    <ul class="rainbow">
      <li
        class="rainbow-arc"
        v-for="shopItem of shops"
        :key="shopItem"
        @click="shopStore.setShop(shopItem)"
      >
        <span>{{ shopItem }}</span>
        <fa-i
          icon="times"
          role="button"
          @click.stop="removeShop(shopItem)"
        ></fa-i>
      </li>
    </ul>
    <CustomInput
      data-testId="shop"
      :placeholder="'Nowy sklep'"
      @submit="newShop"
    />
  </div>
</template>

<script lang="ts">
import CustomInput from '@/components/Input.vue';
import { computed, defineComponent, inject } from '@vue/composition-api';
import { ShopRepository } from './shop-repository';

export default defineComponent({
  name: 'ShopList',
  components: {
    CustomInput,
  },
  inject: ['shopStore'],
  setup() {
    const repository = inject<ShopRepository>(
      'shopRepository'
    ) as ShopRepository;
    const _shops = repository.findAll();
    const shops = computed(() => _shops.value.sort());
    return {
      shops,
      newShop: (name: string) => repository.add(name),
      removeShop: (id: string) => repository.remove(id),
    };
  },
});
</script>

<style scoped></style>
