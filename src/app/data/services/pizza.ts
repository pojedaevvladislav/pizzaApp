import {PizzaAppInterface} from "../interface/pizza-app.interface";
import {of} from "rxjs";

export class PizzaService {
  private pizzaList: PizzaAppInterface[];
  baseApiUrl = 'http://localhost:3000/api/pizzas'

  constructor() {
    this.pizzaList = [{
      pizzaId: 1,
      imageFileName: 'broccolo-1.png',
      name: 'Broccolo',
      ingredients: 'sos pentru pizza, vinete coapte, dovlecei, ciuperci champinion, usturoi, tofu, frișca vegetală',
      isVegetarian: true,
      isSpicy: false,
      price: 124,
      weight: 680
    },];
  }

  getPizzas() {
    return of(this.pizzaList);
  }
}
