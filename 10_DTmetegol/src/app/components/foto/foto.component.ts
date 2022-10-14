import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController } from '@ionic/angular';
import { Partido } from 'src/app/clases/partido';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.scss'],
})
export class FotoComponent implements OnInit {
  partido: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private popoverController: PopoverController) 
  {
    this.partido = this.navParams.get('data');
    
   }

  ngOnInit() {}

}
