import { Item } from './item.model';

export class Category {
  constructor(
    public _id: string,
    public title: string,
    public type: string,
    public description: string,
    public totalAmount: number,
    public items: Item[]   ){   }
}
