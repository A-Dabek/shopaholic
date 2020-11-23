import { reactive } from '@vue/composition-api';

export const shopStore = () => ({
  state: reactive({
    shop: '',
  }),
  setShop: function (name: string) {
    this.state.shop = name;
  },
});
