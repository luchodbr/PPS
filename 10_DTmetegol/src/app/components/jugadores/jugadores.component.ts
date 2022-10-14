import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
})
export class JugadoresComponent implements OnInit {
  jugadores: Usuario[] = [];

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() 
  {
    this.jugadores = DataService.usuarios;
  }

  elegir( usuario: Usuario)
  {
    console.log({ item: usuario });

    this.popoverCtrl.dismiss({
      item: usuario
    });
  }
}
