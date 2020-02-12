import { Item } from './item.model';
import { Category } from './category.model';


export class Project {

  constructor(
   public title: string,
   public type: string,
   public description: string,
   public totalAmount: number,
   public items?: Item[],
   public categories?: Category[],
   public _id?: string,
  ){

  }
}
