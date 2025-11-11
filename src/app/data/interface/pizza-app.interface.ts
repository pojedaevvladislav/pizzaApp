export interface PizzaAppInterface {
  pizzaId: number;
  imageFileName: string;
  name: string;
  ingredients: string;
  price: number;
  weight: number;
  description: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  quantity?: number,
}
