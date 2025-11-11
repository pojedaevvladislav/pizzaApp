import {Component, inject, Input, OnInit} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, NavController} from '@ionic/angular/standalone';
import {PizzaService} from "../data/services/pizza";
import {PizzaAppInterface} from "../data/interface/pizza-app.interface";
import {CommonModule} from "@angular/common";
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";
import {Cart} from "../data/services/cart";
import {pizza} from "ionicons/icons";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, CommonModule, NavBarComponent],
})
export class HomePage implements OnInit{

  pizzas: PizzaAppInterface[] = [];
  cartCount: { [pizzaId: number]: number } = {};

  private pizzaService = inject(PizzaService);
  private cartService = inject(Cart);
  private navController = inject(NavController);

  constructor() {}

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
      pizzas.forEach(pizza => {
        if (this.cartCount[pizza.pizzaId] === undefined) {
          this.cartCount[pizza.pizzaId] = 0;
        }
      });
    });

    this.cartService.cartItems$.subscribe(items => {
      items.forEach(item => {
        this.cartCount[item.pizzaId] = item.quantity || 0;
      });
      this.pizzas.forEach(pizza => {
        const exists = items.find(i => i.pizzaId === pizza.pizzaId);
        if (!exists) {
          this.cartCount[pizza.pizzaId] = 0;
        }
      });

      this.cartCount = {...this.cartCount};

      console.log('CartCount update:', this.cartCount);
    });
  }

  addToCart(pizza: PizzaAppInterface, event: Event): void {
    event?.stopPropagation();
    this.cartService.addToCart({...pizza});
  }

  decrease(pizza: PizzaAppInterface, event: Event): void {
    event?.stopPropagation();
    this.cartService.decreaseItem(pizza.pizzaId);
  }

  handleCartClick(pizza: PizzaAppInterface, event: Event): void {
    event.stopPropagation();
    this.addToCart(pizza, event);
  }

  openPizzaDetails(pizzaId: number) {
    this.navController.navigateForward('/pizza/' + pizzaId);
  }

  get totalItems() {
    return Object.values(this.cartCount).reduce((a, b) => a + b, 0);
  }

}
