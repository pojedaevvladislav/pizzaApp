import {Component, inject, Input, OnInit} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonIcon} from '@ionic/angular/standalone';
import {PizzaService} from "../data/services/pizza";
import {PizzaAppInterface} from "../data/interface/pizza-app.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon],
})
export class HomePage{

  // pizzas: PizzaAppInterface[] = [];
  //
  // private pizzaService = inject(PizzaService);
  //
  // constructor() {}
  //
  // @Input() pizza?: PizzaAppInterface;
  //
  // ngOnInit() {
  //   this.pizzaService.getPizzas().subscribe(pizzas => {
  //     this.pizzas = pizzas;
  //   })
  // }
}
