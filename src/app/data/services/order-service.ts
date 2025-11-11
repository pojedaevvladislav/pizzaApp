import {inject, Injectable} from '@angular/core';
import {OrderInterface} from "../interface/order-interface";
import {BehaviorSubject} from "rxjs";
import {ApiService} from "./api-service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: OrderInterface[] = this.loadOrders();
  private api = inject(ApiService);

  private ordersSubject = new BehaviorSubject<OrderInterface[]>(this.orders);
  orders$ = this.ordersSubject.asObservable();

  private loadOrders(): OrderInterface[] {
    const data = localStorage.getItem('orders');
    return data ? JSON.parse(data) : [];
  }

  private saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  addOrder(order: OrderInterface) {
    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  getAllOrders(): OrderInterface[] {
    return this.orders;
  }

  getLastOrder(): OrderInterface | null {
    return this.orders.length > 0 ? this.orders[this.orders.length - 1] : null;
  }

  clearOrder() {
    this.orders = [];
    localStorage.removeItem('orders');
  }

  getOrderHistory(userId: number) {
    return this.api.sendRequest('get_order_history', { userId })
  }

  getOrderDetails(userId: number, orderId: number) {
    return this.api.sendRequest('get_order_details', {
      userId: userId,
      orderId: orderId
    })
  }
}
