import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent {

  constructor(public viewCtrl: ModalController) {

    //this.splashScreen.hide();
    setTimeout(() => {

      this.viewCtrl.dismiss().then(() => console.log("Dismiss"));
    }, 5000);

  }
}
