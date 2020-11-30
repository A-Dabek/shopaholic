import { fireEvent, render, RenderResult, within } from '@testing-library/vue';
import VueCompositionAPI from '@vue/composition-api';
import { expect } from 'chai';
import Vue from 'vue';
import { PlanList } from './model';
import Planner from './Planner.vue';
import { PlanListRepositoryStub } from './stubs';

Vue.use(VueCompositionAPI);

describe.only('Planner', () => {
  let component: RenderResult;
  let repository: PlanListRepositoryStub;
  const query = {
    lists: () => component.queryAllByRole('listitem', { name: 'plan-list' }),
    list: (name: string) => component.getByText(name),
    listNameInput: () =>
      within(component.getByLabelText('new list')).getByRole(
        'textbox'
      ) as HTMLInputElement,
    listNameSubmit: () =>
      within(component.getByLabelText('new list')).getByRole('button'),
    productNameInput: () =>
      component.getByRole('textbox', { name: 'product name' }),
    productFormSubmit: () =>
      component.getByRole('button', { name: 'submit product' }),
    products: () => component.getAllByRole('listitem', { name: 'product' }),
    product: (name: string) => component.getByText(name),
    quantityInput: () =>
      component.getByRole('spinbutton', { name: 'quantity' }),
    quantityUnits: () => component.getAllByRole('listitem', { name: 'unit' }),
    detailsInput: () => component.getByRole('textbox', { name: 'details' }),
  };

  function setup(lists: PlanList[] = []) {
    repository = new PlanListRepositoryStub();
    repository.data.value = lists;
    component = render(Planner, {
      stubs: { ['fa-i']: { template: `<i @click="$emit('click')"></i>` } },
      provide: {
        planListRepository: repository,
      },
    });
    expect(query.lists().length).to.eq(lists.length);
  }

  describe('when adding a list', () => {
    it('should add to collection on submit', async () => {
      setup();
      await fireEvent.update(query.listNameInput(), 'new list');
      await fireEvent.click(query.listNameSubmit());
      expect(query.lists().length).to.eq(1);
    });

    it('should sanitize input from whitespace and uppercase letter', async () => {
      setup();
      await fireEvent.update(query.listNameInput(), '  UppercasE tESt   ');
      await fireEvent.click(query.listNameSubmit());
      expect(query.list('uppercase test')).to.exist;
    });
  });

  describe('when adding an item to list', () => {
    it('should add on submit with minimal data', async () => {
      setup([{ title: 'list', items: [] }]);
      await fireEvent.update(query.productNameInput(), 'new product');
      await fireEvent.click(query.productFormSubmit());
      expect(query.products().length).to.eq(1);
    });

    it('should sanitize product name', async () => {
      setup([{ title: 'list', items: [] }]);
      await fireEvent.update(query.productNameInput(), '   NeW prODUct 2 ');
      await fireEvent.click(query.productFormSubmit());
      expect(query.product('new product 2')).to.exist;
    });

    it('should add on submit with full data', async () => {
      setup([{ title: 'list', items: [] }]);
      await fireEvent.update(query.productNameInput(), 'new product');
      await fireEvent.update(query.quantityInput(), '3');
      await fireEvent.click(query.quantityUnits()[2]);
      await fireEvent.update(query.detailsInput(), 'custom description');
      await fireEvent.click(query.productFormSubmit());
      expect(query.products().length).to.eq(1);
    });
  });
});
