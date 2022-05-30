import { item } from "./item";

export interface Invoice {
  id?: number;
  amount: number;
  status: number;
  Items: item[];
}
