import { PizzaAppInterface } from "./pizza-app.interface";

export interface OrderInterface {
  orderId: number;
  pizzas: PizzaAppInterface[];
  total: number;
  deliveryAddress: string;
  status: 'pending' | 'inProgress' | 'delivered' | 'cancelled';
  date?: string;
  paymentMethod?: string;
}
