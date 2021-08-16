<template>
  <form>
    <div class="form-group">
      <input
        placeholder="Kolejny produkt"
        aria-label="product name"
        v-model="name"
      />

      <div class="quantity" v-if="!!name">
        <input
          placeholder="1"
          aria-label="quantity"
          v-model="quantity"
          type="number"
        />
        <ul class="units">
          <li
            v-for="u in availableUnits"
            aria-label="unit"
            :key="u"
            :class="{ active: unit === u }"
            @click="unit = u"
          >
            {{ u }}
          </li>
        </ul>
      </div>

      <input
        v-if="!!name"
        placeholder="Szczegóły"
        aria-label="details"
        v-model="details"
      />
    </div>
    <fa-i
      class="icon"
      icon="plus"
      aria-label="submit product"
      role="button"
      @click="submit"
    ></fa-i>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { PlanListItem } from './model';
export default defineComponent({
  name: 'ItemForm',
  setup(_, { emit }) {
    const availableUnits = ['x', 'g', 'dag', 'kg', 'ml', 'l'];
    const name = ref('');
    const details = ref('');
    const unit = ref(availableUnits[0]);
    const quantity = ref<number | undefined>();
    return {
      availableUnits,
      name,
      details,
      unit,
      quantity,
      submit: () => {
        const trimmedName = name.value.trim();
        if (!trimmedName) return;
        const item: PlanListItem = {
          id: trimmedName,
          details: details.value,
          unit: unit.value,
          quantity: Number(quantity.value || 1),
        };
        emit('submit', item);
        name.value = '';
        details.value = '';
        unit.value = availableUnits[0];
        quantity.value = undefined;
      },
    };
  },
});
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
}
.form-group {
  flex-grow: 1;
}
.icon {
  font-size: 2rem;
  margin-left: 1rem;
}
input {
  display: block;
  width: 100%;
}
.quantity {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.quantity input {
  flex: 1;
  text-align: right;
}
.units {
  flex: 2;
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
}
.units li {
  text-transform: none;
}
.units .active {
  text-decoration: underline;
  font-weight: bold;
}
</style>
