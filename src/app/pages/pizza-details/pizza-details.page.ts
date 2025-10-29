import {Component, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.page.html',
  styleUrls: ['./pizza-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonIcon]
})
export class PizzaDetailsPage implements OnInit {

  pizzas: PizzaAppInterface[] = [];
  pizza?: PizzaAppInterface;
  private route = inject(ActivatedRoute)
  private pizzaService = inject(PizzaService);
  private navController = inject(NavController);
  quantity = 1;
  totalPrice = 0;

  constructor() { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pizzaService.getPizzas().subscribe((pizzas: PizzaAppInterface[]) => {
      this.pizza = pizzas.find(pizza => pizza.pizzaId === id);

      if (this.pizza) {
        this.totalPrice = this.pizza.price;
      } else if (this.pizzas.length) {
        this.pizza = this.pizzas[0];
        this.totalPrice = this.pizza.price;
      }
    });
  }

  increaseQuantity() {
    this.quantity++;
    this.updateTotal();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotal();
    }
  }

  updateTotal() {
    if (this.pizza) {
      this.totalPrice = this.pizza!.price * this.quantity;
    }
  }

  closePage() {
    this.navController.navigateBack('/home');

  }
}
