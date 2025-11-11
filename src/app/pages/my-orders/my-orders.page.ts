import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar, NavController} from '@ionic/angular/standalone';
import {NavBarComponent} from "../../components/nav-bar/nav-bar.component";
import {OrderService} from "../../data/services/order-service";
import {OrderInterface} from "../../data/interface/order-interface";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavBarComponent]
})
export class MyOrdersPage implements OnInit {
  private orderService = inject(OrderService);
  private navController = inject(NavController);
  orders: OrderInterface[] = [];

  constructor() { }

  ngOnInit() {
    const userId = Number(localStorage.getItem('userId'));
    this.orderService.getOrderHistory(userId).subscribe({
      next: (res) => {
        console.log('Order history:', res);

        const orders = res.payload?.items || [];

        this.orders = orders.map((order: any) => {
          const groupedPizzas: any[] = [];

          order.pizzas.forEach((pizza: any) => {
            const existing = groupedPizzas.find(p => p.name === pizza.name);
            if (existing) {
              existing.quantity += pizza.quantity;
            } else {
              groupedPizzas.push({ ...pizza })
            }
          });

          return {
            orderId: order.orderId,
            date: order.date,
            total: order.total,
            status: order.status,
            deliveryAddress: order.deliveryAddress,
            paymentMethod: order.paymentMethod,
            pizzas: groupedPizzas,
          }

        })
      },
      error: (err) => console.error('Error fetching order history:', err)
    })
  }

  goToOrderDetailsPage(orderId: number) {
    this.navController.navigateForward(`/order-details/${orderId}`);
  }

}
