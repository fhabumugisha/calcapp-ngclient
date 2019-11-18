import { Item } from './item.model';

export class Category {
  constructor(
    public id: string,
    public title: string,
    public type: string,
    public totalAmount: number,
    public items: Item[]   ){   }
}
