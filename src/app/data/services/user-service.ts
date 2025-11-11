import {inject, Injectable} from '@angular/core';
import {ApiService} from "./api-service";
import {map, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = inject(ApiService);
  private userId: string | null = null;

  registerUser(userData: any): Observable<any> {
    const payload = {
      email: userData.email,
      password: userData.password
    }

    return this.api.sendRequest('user_register', payload).pipe(
      map((response: any) => response?.payload ?? {})
    );
  }

  loginUser(credentials: any): Observable<any> {
    const payload = {
      email: credentials.email,
      password: credentials.password
    };

    return this.api.sendRequest('user_login', payload).pipe(
      tap((response: any) => {
        const id = response?.payload?.userId;
        if (id) {
          this.userId = id;
          localStorage.setItem('userId', id);
          console.log('User logged in:', id);
        }
      }),
      map((response) => response?.payload ?? {})
    );
  }

  logoutUser(userId: number) {
    return this.api.sendRequest('user_logout', {userId: userId});
  }

  getUserId(): string | null {
    return this.userId || localStorage.getItem('userId');
  }
}
