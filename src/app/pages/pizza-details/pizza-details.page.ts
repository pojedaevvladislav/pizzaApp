import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAccordion,
  IonAccordionGroup, IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonItem, IonLabel,
  IonTitle,
  IonToolbar, NavController
} from '@ionic/angular/standalone';
import {ActivatedRoute, Router} from "@angular/router";
import {PizzaAppInterface} from "../../data/interface/pizza-app.interface";
import {PizzaService} from "../../data/services/pizza";
import {Cart} from "../../data/services/cart";

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.page.html',
  styleUrls: ['./pizza-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonIcon]
})
export class PizzaDetailsPage implements OnInit {

  pizza!: PizzaAppInterface;
  private route = inject(ActivatedRoute)
  private pizzaService = inject(PizzaService);
  private cartService = inject(Cart);
  private navController = inject(NavController);
  quantity: number = 1;
  totalPrice = 0;
  pizzaId!: number;

  constructor() {
  }

  ngOnInit() {
    const pizzaId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Pizza ID from route:', pizzaId);

    this.pizzaService.getPizzaDetails(pizzaId).subscribe((res: any) => {
      console.log('Server response:', res);
      console.log('Server payload:', res.payload);

      this.pizza = { pizzaId, ...res };

      console.log('Pizza object after assignment:', this.pizza);

      this.updateTotalPrice();
    });

    this.updateTotalPrice();
  }

  increaseQuantity() {
    this.quantity++;
    this.updateTotalPrice();
  }

  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
    this.updateTotalPrice();
  }

  addToCart() {
    const userId = Number(localStorage.getItem('userId'));
    const pizzaId = this.pizza?.pizzaId; // берем именно из payload
    const quantity = this.quantity;

    console.log('Добавление в корзину:', { userId, pizzaId, quantity });

    this.pizzaService.addPizzaToCart(userId, pizzaId, quantity).subscribe({
      next: (res) => console.log('Pizza added to cart:', res),
      error: (err) => console.log('Error adding pizza to cart:', err)
    });
  }


  updateTotalPrice() {
    if (this.pizza?.price) {
      this.totalPrice = this.pizza.price * this.quantity;
    }
  }

  closePage() {
    this.navController.navigateBack('/home');
  }
}
