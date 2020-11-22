<template>
  <form>
    <div class="form-group">
      <input placeholder="Kolejny produkt" v-model="name" />

      <div class="quantity">
        <input placeholder="Liczba / Ilość" v-model="quantity" type="number" />
        <ul class="units">
          <li
            v-for="u in availableUnits"
            :key="u"
            :class="{ active: unit === u }"
            @click="unit = u"
          >
            {{ u }}
          </li>
        </ul>
      </div>

      <input placeholder="Szczegóły" v-model="details" />
    </div>
    <fa-i class="icon" icon="plus" @click="submit"></fa-i>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { ItemToBuy } from './item-to-buy';
export default defineComponent({
  name: 'ToBuyItem',
  setup(props, { emit }) {
    const availableUnits = ['x', 'g', 'dag', 'kg', 'ml', 'l'];
    const name = ref('');
    const details = ref('');
    const unit = ref(availableUnits[0]);
    const quantity = ref(1);
    return {
      availableUnits,
      name,
      details,
      unit,
      quantity,
      submit: () => {
        const trimmedName = name.value.trim().toLowerCase();
        if (!trimmedName) return;
        const item: ItemToBuy = {
          name: trimmedName,
          details: details.value,
          unit: unit.value,
          quantity: Number(quantity.value),
        };
        emit('submit', item);
        name.value = '';
        details.value = '';
        unit.value = '';
        quantity.value = 1;
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
input::placeholder {
  font-style: italic;
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
