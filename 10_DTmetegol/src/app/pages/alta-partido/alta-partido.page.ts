import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ModalController, PopoverController } from '@ionic/angular';
import { Equipo, TipoEquipo } from 'src/app/clases/equipo';
import { Partido } from 'src/app/clases/partido';
import { Usuario } from 'src/app/clases/usuario';
import { JugadoresComponent } from 'src/app/components/jugadores/jugadores.component';
import { DataService } from 'src/app/services/data.service';
import { PartidosService } from 'src/app/services/partidos.service';

@Component({
  selector: 'app-alta-partido',
  templateUrl: './alta-partido.page.html',
  styleUrls: ['./alta-partido.page.scss'],
})
export class AltaPartidoPage implements OnInit {
  partido: Partido = new Partido();
  equipoA: Equipo = new Equipo();
  equipoB: Equipo = new Equipo();
  mensaje: string;
  fechaActual: string = new Date().toISOString(); 
  fecha;
  meses: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", 
                    "Junio", "Julio", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
          

  constructor(public toastController: ToastController,
              private dataService: DataService,
              private partidoService: PartidosService,
              private router: Router,
              private modalController: ModalController,
              private popoverController: PopoverController) { }

  ngOnInit() {
    console.log(new Date().toISOString());
  }

  onSubmitTemplate() {
    console.log('Form submit');
    if(this.equipoA && this.equipoB)
    {
      this.partido = Partido.CrearPartido('0', this.equipoA, this.equipoB, new Date().toUTCString(), "0");

      this.partidoService.crear(this.partido).then(res => {
        console.log("Partido cargado");
        //this.router.navigate(['/menu']);
        this.presentToast("Partido cargado");
      },
      error => this.presentToast(error));
    }
    else
    {
      this.presentToast("¡Elegir equipos!");
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      mode: 'ios'
    });
    toast.present();
  }

  async elegirEquipo(ev: any, equipo: TipoEquipo) 
  {
    let usuario: Usuario = new Usuario();
    console.log(`Elegir equipo ${equipo}`);

    const popover = await this.popoverController.create({
      component: JugadoresComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      mode: 'ios',
      backdropDismiss: true
    });
    await popover.present();

    popover.onWillDismiss().then( response => {
      usuario = response.data.item;
      console.log(usuario);
      switch(equipo)
      {
        case TipoEquipo.A :
          if(!this.equipoB.id || usuario.id != this.equipoB.id)
          {
            this.equipoA = Equipo.CrearEquipo(usuario.id, usuario.nombre, 0);
          }
          break;
        case TipoEquipo.B :
          if(!this.equipoA.id || usuario.id != this.equipoA.id)
          {
            this.equipoB = Equipo.CrearEquipo(usuario.id, usuario.nombre, 0);
          }
          break;
      }
    });

   
  }

  cambioFecha(event)
  {
    console.log(event);
    console.log('Date', new Date(event.detail.value));
  }
}
