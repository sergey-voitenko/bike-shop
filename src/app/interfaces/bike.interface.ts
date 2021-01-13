export interface Bike {
  discountedPrice: number;
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
  review: IReview[];
}

export interface IReview {
  author: string;
  text: string;
  rating: number;
}
