import { shopStore } from '@/store/store';
import { fireEvent, render, RenderResult, within } from '@testing-library/vue';
import VueCompositionAPI from '@vue/composition-api';
import { expect } from 'chai';
import Vue from 'vue';
import Shops from '../shops/Shops.vue';
import { ShopRepositoryStub } from './shop-repository-stub';

Vue.use(VueCompositionAPI);

describe.only('Shops', () => {
  let component: RenderResult;
  const input = () => component.getByRole('textbox') as HTMLInputElement;
  const submit = () =>
    within(component.getByTestId('shop')).getByRole('button');
  const items = () => component.queryAllByRole('listitem');
  const item = (name: string) => component.getByText(name);
  const removeBtn = () =>
    within(component.getByRole('listitem')).getByRole('button');
  let repository: ShopRepositoryStub;

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
    expect(items().length).to.eq(shops.length);
  }

  describe('when adding new shop', () => {
    it('should add to collection on submit', async () => {
      setup();
      await fireEvent.update(input(), 'new shop');
      await fireEvent.click(submit());
      expect(items().length).to.eq(1);
    });

    it('should sanitize input from whitespace and uppercase letter', async () => {
      setup();
      await fireEvent.update(input(), '  UppercasE tESt   ');
      await fireEvent.click(submit());
      expect(item('uppercase test')).to.exist;
    });

    it('should order shops alphabetically', async () => {
      setup(['b shop', 'd shop', 'f shop']);
      await fireEvent.update(input(), 'a shop');
      await fireEvent.click(submit());
      expect(items()[0].textContent).to.eq('a shop');

      await fireEvent.update(input(), 'g shop');
      await fireEvent.click(submit());
      expect(items()[4].textContent).to.eq('g shop');

      await fireEvent.update(input(), 'c shop');
      await fireEvent.click(submit());
      expect(items()[2].textContent).to.eq('c shop');
    });
  });

  it('should remove shop', async () => {
    const testQuery = 'removal test';
    setup([testQuery]);
    await fireEvent.click(removeBtn());
    expect(items().length).to.eq(0);
  });
});
