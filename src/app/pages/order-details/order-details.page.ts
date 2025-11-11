import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonContent, IonHeader, IonTitle, IonToolbar, NavController} from '@ionic/angular/standalone';
import {NavBarComponent} from "../../components/nav-bar/nav-bar.component";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../data/services/order-service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavBarComponent]
})
export class OrderDetailsPage implements OnInit {
  private nawController = inject(NavController);

  constructor() {
  }

  orderDetails: any;
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  ngOnInit() {
    const orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    const userId = Number(localStorage.getItem('userId'));

    if (userId && orderId) {
      this.loadOrderDetails(userId, orderId);
    }
  }

  loadOrderDetails(userId: number, orderId: number) {
    this.orderService.getOrderDetails(userId, orderId)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            const payload = res.payload;
            const groupedItems: any[] = [];

            payload.items.forEach((item: any) => {
              const existing = groupedItems.find(p => p.name === item.name);
              if (existing) {
                existing.quantity += item.quantity;
              } else {
                groupedItems.push({ ...item })
              }
            });
            this.orderDetails = {
              ...payload,
              items: groupedItems,
              date: new Date()
            };
            console.log('Order details loaded:', this.orderDetails);
          } else {
            console.warn('Order details not found');
          }
        },
        error: (err) => console.error('Error fetching order details:', err)
      })
  }

  closeDetailsPage() {
    this.nawController.navigateBack('/home');
  }

}
