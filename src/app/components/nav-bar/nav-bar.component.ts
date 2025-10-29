import { Component, OnInit } from '@angular/core';
import {IonHeader} from "@ionic/angular/standalone";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    imports: [
        IonHeader
    ]
})
export class NavBarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
