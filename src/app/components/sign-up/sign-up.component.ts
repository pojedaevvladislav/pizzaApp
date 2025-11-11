import {Component, inject, OnInit} from '@angular/core';
import {IonInput, IonItem, IonList, NavController} from "@ionic/angular/standalone";
import {UserService} from "../../data/services/user-service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [
    IonInput,
    IonItem,
    IonList,
    FormsModule
  ]
})
export class SignUpComponent implements OnInit {
  email = '';
  password = '';
  private navController = inject(NavController);
  private userService = inject(UserService);

  constructor() {
  }

  ngOnInit() {
  }

  // signUp() {
  //
  // }

  onRegister() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('Регистрация успешна:', response);
        this.navController.navigateForward('/home');
      },
      error: (err) => {
        console.error('Ошибка при регистрации', err);
      }
    });
  }

}
