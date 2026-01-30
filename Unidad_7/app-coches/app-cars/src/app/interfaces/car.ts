import { User } from './user';

export interface Car {
  _id?: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  photo: string;
  user: User;
}
