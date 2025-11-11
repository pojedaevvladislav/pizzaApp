import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PizzaAppInterface} from "../interface/pizza-app.interface";
import {ApiService} from "./api-service";
import {PizzaService} from "./pizza";

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private items: PizzaAppInterface[] = this.loadCart();
  private api = inject(ApiService);
  private pizzaService = inject(PizzaService);

  private cartItemsSubject = new BehaviorSubject<PizzaAppInterface[]>(this.items);
  cartItems$ = this.cartItemsSubject.asObservable();

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private loadCart(): PizzaAppInterface[] {
    const data = localStorage.getItem('cart');
    const parsed = data ? JSON.parse(data) : [];
    return parsed.map((item: PizzaAppInterface) => ({
      ...item,
      quantity: item.quantity ?? 1
    }));
  }

  addToCart(pizza: PizzaAppInterface) {
    const userId = Number(localStorage.getItem('userId'));
    const quantity = 1;

    return this.pizzaService.addPizzaToCart(userId, pizza.pizzaId, quantity)
      .subscribe({
        next: (res) => {
          console.log('Pizza added to cart via cartService:', res);

          const existing = this.items.find(p => p.pizzaId === pizza.pizzaId);
          if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
          } else {
            this.items.push({
              ...pizza,
              quantity: 1
            });
          }
          this.saveCart();
          this.incrementCount(); // обновляем локальный счётчик
        },
        error: (err) => console.error(err)
      });
  }

  deletePizzaFromCart(pizzaId: number) {
    const userId = Number(localStorage.getItem('userId'));
    const item = this.items.find(p => p.pizzaId === pizzaId);
    if (!item) return;

    const quantity = item.quantity || 1;

    return this.api.sendRequest('delete_pizza_from_cart', {
      userId: userId,
      pizzaId: pizzaId,
      quantity: quantity
    })
    .subscribe({
      next: (res) => {
        console.log('Pizza removed from cart on server', res);

        this.items = this.items.filter(p => p.pizzaId !== pizzaId);
        this.cartItemsSubject.next(this.items);
        localStorage.setItem('cart', JSON.stringify(this.items));
      },
      error: (err) => {
        console.error('Error removing pizza from cart:', err);
      }
    });
  }

  placeOrder(paymentMethod: string, deliveryAddress: string) {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      console.error('User ID not found! Cannot place order.');
      return;
    }

    return this.api.sendRequest('place_order', {
      userId: userId,
      paymentMethod: paymentMethod,
      deliveryAddress: deliveryAddress,
    })
      .subscribe({
        next: (res) => {
          console.log('Order placed successfully:', res);
          this.clearCart();
        },
        error: (err) => {
          console.error('Error placing order:', err);
        }
      })
  }

  decreaseItem(pizzaId: number) {
    const item = this.items.find(p => p.pizzaId === pizzaId);
    if (!item) return;
    item.quantity = (item.quantity || 1) - 1;

    if (item.quantity! <= 0) {
      this.items = this.items.filter(p => p.pizzaId !== pizzaId);
    }
    this.saveCart();
    this.cartItemsSubject.next(this.items);
  }

  removeItem(pizzaId: number) {
    this.items = this.items.filter(p => p.pizzaId !== pizzaId);
    this.saveCart();
    this.cartItemsSubject.next(this.items);
  }

  clearCart() {
    this.items = [];
    this.cartItemsSubject.next(this.items);
    localStorage.removeItem('cart');
  }

  getItems() {
    return this.items;
  }

  getCart(userId: number) {
    return this.api.sendRequest('get_cart', {userId: userId});
  }

  incrementCount() {
    this.cartItemsSubject.next(this.items);
  }

}
