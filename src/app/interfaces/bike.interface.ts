export interface Bike {
  id: number;
  imgUrl: string;
  price: number;
  discount: number;
  main: boolean;
  shop: string;
  name: string;
  description: string;
  shipping: string | null;
  discountUntil: string;
  new: boolean;
  color: string[];
  size: string[];
  review: {}[];
}
