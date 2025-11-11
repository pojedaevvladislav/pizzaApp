import {PizzaAppInterface} from "../interface/pizza-app.interface";
import {from, map, Observable, of, tap} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {ApiService} from "./api-service";
import {pizza} from "ionicons/icons";


@Injectable({
  providedIn: 'root'
})

export class PizzaService {
  private api = inject(ApiService)
  // private pizzaList: PizzaAppInterface[];


  // private http = inject(HttpClient);

  constructor() {
  }

  getPizzas(): Observable<PizzaAppInterface[]> {
    return this.api.sendRequest('get_pizza_list').pipe(
      map((data: any) => data?.payload?.items ?? [])
    );

    // return this.api.sendRequest('get_pizza_list').subscribe(res => console.log('pizza list:', res));
  }

  getPizzaDetails(pizzaId: number): Observable<any> {
    return this.api.sendRequest('get_pizza_details', {pizzaId: pizzaId}).pipe(
      map((data: any) => data?.payload ?? {})
    )
  }

  addPizzaToCart(userId: number, pizzaId: number, quantity: number) {
    const payload = { userId, pizzaId, quantity };
    return this.api.sendRequest('add_pizza_to_cart', payload);
  }
}


// getPizzas(): Observable<Array<any>> {
//   const headers = new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Gtk-operation': 'get_pizza_list',
//   });
//   const operationData = {
//     operation: "get_pizza_list",
//     payload: {}
//   }
//   const payload = JSON.stringify(operationData);
//   console.log(payload)
//   return this.http.post<any>(`${this.baseApiUrl}`, payload, {headers})
//     .pipe(map((data) => {
//       return data?.payload.items;
//     }));
// }

