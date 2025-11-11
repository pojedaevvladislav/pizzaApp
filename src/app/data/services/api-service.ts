import { Injectable } from '@angular/core';
import {catchError, from, map, Observable, of} from "rxjs";
import {CapacitorHttp} from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApiUrl = 'https://nondurable-bronchially-chu.ngrok-free.dev/PIZZA_FLUTTER-mbank/json_processor';

  constructor() {};

  sendRequest(operation: string, payload: any = {}): Observable<any> {
    const body = {
      operation,
      payload
    };

    const options = {
      url: this.baseApiUrl,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Gtk-operation': operation,
      },
      data: body
    };

    return from(CapacitorHttp.request(options)).pipe(
      map((response: any) => response.data ?? {}),
      catchError((error) => {
        console.error(`[API ERROR} ${operation}`, error);
        return of({error: true, message: error.message || 'Unknown error'})
      })
    );
  }
}



