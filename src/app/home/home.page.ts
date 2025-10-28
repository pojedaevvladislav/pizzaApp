import {Component, inject, Input, OnInit} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonIcon} from '@ionic/angular/standalone';
import {PizzaService} from "../data/services/pizza";
import {PizzaAppInterface} from "../data/interface/pizza-app.interface";
import {CommonModule} from "@angular/common";
import {NavBarComponent} from "../components/nav-bar/nav-bar.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, CommonModule, NavBarComponent],
})
export class HomePage implements OnInit{

  pizzas: PizzaAppInterface[] = [];

  private pizzaService = inject(PizzaService);

  cartCount: { [pizzaId: number]: number } = {};

  private router = inject(Router);

  constructor() {}

  @Input() pizza?: PizzaAppInterface;

  ngOnInit() {
    this.pizzaService.getPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
      pizzas.forEach(pizza => this.cartCount[pizza.pizzaId] = 0);
    });
  }

  addToCart(pizzaId: number): void {
    this.cartCount[pizzaId]++;
  }

  decrease(pizzaId: number): void {
    if (this.cartCount[pizzaId] > 0) this.cartCount[pizzaId]--;
  }

  openPizzaDetails(pizzaId: number) {
    this.router.navigate(['/pizza', pizzaId])
  }
}
