import {Component, NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonTitle,
  IonToolbar,
  IonSegmentButton,
  IonSegmentView, IonSegmentContent
} from '@ionic/angular/standalone';
import {NavBarComponent} from "../../components/nav-bar/nav-bar.component";
import {SignInComponent} from "../../components/sign-in/sign-in.component";
import {SignUpComponent} from "../../components/sign-up/sign-up.component";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NavBarComponent, IonSegment, IonLabel, IonSegmentButton, SignInComponent, IonSegmentView, IonSegmentContent, SignUpComponent]
})
export class LoginPagePage implements OnInit {
  selectedSegment = 'login';

  constructor() { }

  ngOnInit() {

  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    console.log('Segment changed', this.selectedSegment);
  }

}
