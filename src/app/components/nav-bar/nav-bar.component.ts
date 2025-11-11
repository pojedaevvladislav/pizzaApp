import {Component, inject, Input, OnInit} from '@angular/core';
import {IonHeader, NavController} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";
import {UserService} from "../../data/services/user-service";

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    imports: [
        IonHeader,
        CommonModule
    ]
})
export class NavBarComponent  implements OnInit {

  private navController = inject(NavController);
  private userService = inject(UserService);

  @Input() totalItems: number = 0;
  @Input() showBackButton: boolean = false;
  @Input() showCartButton: boolean = true;
  @Input() showLogo: boolean = true;
  @Input() showLoginButton: boolean = true;
  @Input() showLogoutButton: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    this.navController.back();
  }

  openCartPage() {
    event?.stopPropagation();
    this.navController.navigateForward('/cart-page');
  }

  openLoginPage() {
    event?.stopPropagation();
    this.navController.navigateForward('/login-page');
  }

  onLogout() {
    event?.stopPropagation();
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      console.warn('Нет userId - перенаправляю на логин');
      this.navController.navigateForward('/login-page');
      return;
    }

    console.log('Отправляю logout для userId:', userId);

    this.userService.logoutUser(userId).subscribe({
      next: (res) => {
        console.log('Logout успешен:', res);
        localStorage.removeItem('userId');
        this.navController.navigateForward('/login-page');
      },
      error: (err) => {
        console.error('Ошибка logout:', err);
        localStorage.removeItem('userId');
        this.navController.navigateForward('/login-page');
      }
    });
  }

  protected readonly event = event;
}
