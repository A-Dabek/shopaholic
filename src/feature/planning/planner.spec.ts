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
      within(component.getByTestId('list')).getByRole(
        'textbox'
      ) as HTMLInputElement,
    listNameSubmit: () =>
      within(component.getByTestId('list')).getByRole('button'),
  };

  function setup(lists: PlanList[] = []) {
    repository = new PlanListRepositoryStub();
    repository.data.value = lists;
    component = render(Planner, {
      stubs: ['fa-i'],
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
});
