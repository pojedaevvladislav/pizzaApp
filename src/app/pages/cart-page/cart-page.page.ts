import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar, NavController} from '@ionic/angular/standalone';
import {Cart} from "../../data/services/cart";
import {PizzaAppInterface} from "../../data/interface/pizza-app.interface";
import {NavBarComponent} from "../../components/nav-bar/nav-bar.component";
import {OrderService} from "../../data/services/order-service";
import {OrderInterface} from "../../data/interface/order-interface";
import {pizza} from "ionicons/icons";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.page.html',
  styleUrls: ['./cart-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, NavBarComponent]
})
export class CartPagePage implements OnInit {
  private cartService = inject(Cart);
  private navController = inject(NavController);
  private orderService = inject(OrderService);
  cartItems: PizzaAppInterface[] = [];
  selectedAddress: string | null = null;
  selectedPayment: string | null = null;
  userId!: number;

  constructor() { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
    this.userId = Number(localStorage.getItem('userId'));
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart(this.userId).subscribe({
      next: (res) => {
        console.log('Cart response:', res);
        this.cartItems = res.payload?.items || [];
      },
      error: (err) => {
        console.error('Ошибка при загрузке корзины:', err);
      }
    });
  }

  removeFromCart(pizzaId: number, event: Event) {
    event.stopPropagation();
    this.cartService.deletePizzaFromCart(pizzaId);
  }

  placeOrder() {
    if (!this.selectedAddress || !this.selectedPayment) {
      console.warn('Please select address and payment method');
      return;
    }

    const order = {
      orderId: Date.now(),
      pizzas: this.cartItems,
      total: this.getTotalPrice(),
      status: 'pending' as 'pending',
      deliveryAddress: this.selectedAddress,
      paymentMethod: this.selectedPayment
    }

    this.orderService.addOrder(order);
    this.cartService.clearCart();

    this.cartService.placeOrder(this.selectedPayment, this.selectedAddress)
    this.navController.navigateForward('/status-order');
  };

  increaseItem(pizza: PizzaAppInterface) {
    this.cartService.addToCart(pizza);
  }

  decreaseItem(pizzaId: number) {
    this.cartService.decreaseItem(pizzaId);
  }

  removeItem(pizzaId: number) {
    this.cartService.removeItem(pizzaId);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  selectAddress(address: string) {
    this.selectedAddress = address;
  }

  selectPayment(payment: string) {
    this.selectedPayment = payment;
  }

  get canPlaceOrder(): boolean {
    return this.cartItems.length > 0 && !!this.selectedAddress && !!this.selectedPayment;
  }

  // goToOrderPage() {
  //   this.navController.navigateBack('/status-order');
  // }

  // placeOrder() {
  //   const items = this.cartService.getItems();
  //   const totalPrice = items.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);
  //
  //   const order: OrderInterface = {
  //     id: Date.now(),
  //     items: this.cartItems,
  //     totalPrice: this.getTotalPrice(),
  //     address: this.selectedAddress,
  //     paymentMethod: this.selectedPayment,
  //     status: 'pending',
  //   };
  //
  //
  //   this.orderService.addOrder(order);
  //   this.cartService.clearCart();
  //   this.navController.navigateForward('/status-order');
  // }

  protected readonly pizza = pizza;
}
