import { Component, ComponentRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {


  constructor(public viewCtrl: ModalController, public splashScreen: SplashScreen, private router: Router) {
    // this.splashScreen.hide();
    //this.splashScreen.hide();
    setTimeout(() => {

      this.viewCtrl.dismiss().then(() => console.log("Dismiss"));
    }, 5000);

  }

  ngOnInit() {
  }


}
