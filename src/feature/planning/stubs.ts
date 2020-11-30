import { ref, Ref } from '@vue/composition-api';
import { PlanList, PlanListItem, PlanListRepository } from './model';

export class PlanListRepositoryStub implements PlanListRepository {
  data = ref<PlanList[]>([]);

  findAll(): Ref<PlanList[]> {
    return this.data;
  }

  add(name: string): void {
    this.data.value = [
      ...this.data.value.filter(item => item.title !== name),
      { title: name, items: [] },
    ];
  }

  remove(name: string): void {
    this.data.value = this.data.value.filter(item => item.title !== name);
  }

  addListItem(listName: string, item: PlanListItem) {
    const list = this.data.value.find(l => l.title === listName);
    if (!list) return;
    list.items = [...list.items, item];
    this.data.value = [...this.data.value];
  }

  removeListItem(listName: string, item: string): void {
    const list = this.data.value.find(l => l.title === listName);
    if (!list) return;
    list.items = list.items.filter(i => i.name !== item);
    this.data.value = [...this.data.value];
  }
}
