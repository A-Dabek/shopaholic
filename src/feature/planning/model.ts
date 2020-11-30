import { Ref } from '@vue/composition-api';

export interface PlanListItem {
  name: string;
  details: string;
  unit: string;
  quantity: number;
}

export interface PlanList {
  id: string;
  items: PlanListItem[];
  title: string;
}

export interface PlanListRepository {
  findAll(): Ref<PlanList[]>;
  add(name: string): void;
  remove(name: string): void;
}
