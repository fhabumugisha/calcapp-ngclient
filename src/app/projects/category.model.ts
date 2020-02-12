import { Item } from './item.model';

export class Category {
  constructor(

    public title: string,
    public type: string,
    public description: string,
    public totalAmount: number,
    public items: Item[] ,
    public _id?: string ){   }
}
