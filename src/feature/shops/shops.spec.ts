import { shopStore } from '@/store/store';
import { fireEvent, render, RenderResult, within } from '@testing-library/vue';
import VueCompositionAPI from '@vue/composition-api';
import { expect } from 'chai';
import Vue from 'vue';
import Shops from '../shops/Shops.vue';
import { ShopRepositoryStub } from './shop-repository-stub';

Vue.use(VueCompositionAPI);

describe('Shops', () => {
  let component: RenderResult;
  let repository: ShopRepositoryStub;
  const query = {
    input: () => component.getByRole('textbox') as HTMLInputElement,
    submit: () => within(component.getByTestId('shop')).getByRole('button'),
    items: () => component.queryAllByRole('listitem'),
    item: (name: string) => component.getByText(name),
    removeBtn: () =>
      within(component.getByRole('listitem')).getByRole('button'),
  };

  function setup(shops: string[] = []) {
    repository = new ShopRepositoryStub();
    repository.shops.value = shops;
    component = render(Shops, {
      stubs: ['fa-i'],
      provide: {
        shopStore: shopStore(),
        shopRepository: repository,
      },
    });
    expect(query.items().length).to.eq(shops.length);
  }

  describe('when adding new shop', () => {
    it('should add to collection on submit', async () => {
      setup();
      await fireEvent.update(query.input(), 'new shop');
      await fireEvent.click(query.submit());
      expect(query.items().length).to.eq(1);
    });

    it('should sanitize input from whitespace and uppercase letter', async () => {
      setup();
      await fireEvent.update(query.input(), '  UppercasE tESt   ');
      await fireEvent.click(query.submit());
      expect(query.item('uppercase test')).to.exist;
    });

    it('should order shops alphabetically', async () => {
      setup(['b shop', 'd shop', 'f shop']);
      await fireEvent.update(query.input(), 'a shop');
      await fireEvent.click(query.submit());
      expect(query.items()[0].textContent).to.eq('a shop');

      await fireEvent.update(query.input(), 'g shop');
      await fireEvent.click(query.submit());
      expect(query.items()[4].textContent).to.eq('g shop');

      await fireEvent.update(query.input(), 'c shop');
      await fireEvent.click(query.submit());
      expect(query.items()[2].textContent).to.eq('c shop');
    });
  });

  it('should remove shop', async () => {
    const testQuery = 'removal test';
    setup([testQuery]);
    await fireEvent.click(query.removeBtn());
    expect(query.items().length).to.eq(0);
  });
});
