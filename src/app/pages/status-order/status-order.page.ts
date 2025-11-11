import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar, NavController} from '@ionic/angular/standalone';
import {OrderService} from "../../data/services/order-service";
import {OrderInterface} from "../../data/interface/order-interface";
import {PizzaAppInterface} from "../../data/interface/pizza-app.interface";

@Component({
  selector: 'app-status-order',
  templateUrl: './status-order.page.html',
  styleUrls: ['./status-order.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class StatusOrderPage implements OnInit {
  private orderService = inject(OrderService);
  order: OrderInterface | null = null;
  private navController = inject(NavController);

  constructor() {
  }

  ngOnInit() {
    const lastOrder = this.orderService.getLastOrder();

    if (lastOrder) {
      this.order = lastOrder
      console.log('Loaded order:', this.order);
    }

  }

  goToMyOrdersPage() {
    this.navController.navigateForward('/my-orders');
  }

  get groupedPizzas() {
    if (!this.order) return [];
    const map = new Map<string, { pizza: PizzaAppInterface, quantity: number }>();

    this.order.pizzas.forEach(pizza => {
      if (map.has(pizza.name)) {
        map.get(pizza.name)!.quantity += pizza.quantity || 1;
      } else {
        map.set(pizza.name, { pizza, quantity: pizza.quantity || 1 });
      }
    });

    return Array.from(map.values());
  }
}
