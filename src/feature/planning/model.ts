import { Ref } from '@vue/composition-api';

export interface PlanListItem {
  name: string;
  details: string;
  unit: string;
  quantity: number;
}

export interface PlanList {
  items: PlanListItem[];
  title: string;
}

export interface PlanListRepository {
  findAll(): Ref<PlanList[]>;
  add(name: string): void;
  remove(name: string): void;
  addListItem(listName: string, item: PlanListItem): void;
  removeListItem(listName: string, item: string): void;
}
