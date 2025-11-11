import {Component, inject, OnInit} from '@angular/core';
import {IonContent, IonInput, IonItem, IonList, NavController} from "@ionic/angular/standalone";
import {UserService} from "../../data/services/user-service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  imports: [
    IonContent,
    IonList,
    IonItem,
    IonInput,
    FormsModule
  ]
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';
  private navController = inject(NavController);
  private userService = inject(UserService);

  constructor() {
  }

  ngOnInit() {
  }

  onLogin() {
    const credentials = {
      email: this.email.trim(),
      password: this.password.trim()
    };

    if (!credentials.email || !credentials.password) {
      console.warn('Введите email и пароль!')
      return;
    }
    console.log('Отправляю логин с данными:', credentials)

    this.userService.loginUser(credentials).subscribe({
      next: (response) => {
        console.log('Логин успешен:', response);

        if (response?.userId) {
          localStorage.setItem('userId', response.userId);
          this.navController.navigateRoot('/home');
        } else {
          console.warn('Ответ без userId:', response);
        }
      },
      error: (err) => {
        console.error('Ошибка при логине:', err);
      }
    });
  }

}
