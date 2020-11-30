import { ref, Ref } from '@vue/composition-api';
import { PlanList, PlanListRepository } from './model';

export class PlanListRepositoryStub implements PlanListRepository {
  data = ref<PlanList[]>([]);

  findAll(): Ref<PlanList[]> {
    return this.data;
  }

  add(name: string): void {
    this.data.value = [
      ...this.data.value.filter(item => item.title !== name),
      { id: String(Math.random()), title: name, items: [] },
    ];
  }

  remove(name: string): void {
    this.data.value = this.data.value.filter(item => item.title !== name);
  }
}
