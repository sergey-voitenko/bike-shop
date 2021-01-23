export interface Bike {
  discountedPrice?: number;
  id?: string;
  imgUrl: string;
  price: number;
  discount: number;
  main?: boolean;
  shop: string;
  name: string;
  description: string;
  shipping: string | null;
  discountUntil: string;
  new: boolean;
  color: string[];
  size: string[];
  review?: IReview[];
  availability?: boolean;
}

export interface IReview {
  author: string;
  text: string;
  rating: number;
}
