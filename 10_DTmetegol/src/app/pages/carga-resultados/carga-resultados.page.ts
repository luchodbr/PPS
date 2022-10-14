import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonList, LoadingController, PopoverController } from '@ionic/angular';
import { Equipo } from 'src/app/clases/equipo';
import { Partido } from 'src/app/clases/partido';
import { Usuario } from 'src/app/clases/usuario';
import { FotoComponent } from 'src/app/components/foto/foto.component';
import { DataService } from 'src/app/services/data.service';
import { ImagenService } from 'src/app/services/imagen.service';
import { PartidosService } from 'src/app/services/partidos.service';

@Component({
  selector: 'app-carga-resultados',
  templateUrl: './carga-resultados.page.html',
  styleUrls: ['./carga-resultados.page.scss'],
})
export class CargaResultadosPage implements OnInit {
  partidos: Partido[] = [];
  jugadores: Usuario[] = [];

  @ViewChild('lista', { static: false}) lista: IonList;

  constructor(private partidoService: PartidosService, 
              private dataService: DataService,
              private imagenService: ImagenService,
              private loadingController: LoadingController,
              private alertCtrl: AlertController,
              private popoverController: PopoverController) 
  { 
    this.jugadores = DataService.usuarios;
    this.partidos = PartidosService.partidos;
    this.presentLoading();
    console.log(this.jugadores);
    console.log(this.partidos);
  }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando partidos',
      duration: 2000,
      spinner: 'bubbles',
      mode: "ios"
    });
    await loading.present();
  }

  async mostrarVentana(partido) {

    const alert = await this.alertCtrl.create({
      translucent: true,
      header: 'Cargar resultados',
      mode: "md",
      inputs: [
        {
          name: 'golesA',
          type: 'number',
          placeholder: 'Puntos Equipo A', 
        },
        {
          name: 'golesB',
          type: 'number',
          placeholder: 'Puntos Equipo B', 
        },
      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Cargar',
          handler: (data) => this.guardarResultados(data, partido)
        }
      ]
    });

    await alert.present();
  }

  guardarResultados(data, partido)
  {

    console.log(data);
    partido.equipoA.goles = data.golesA;
    partido.equipoB.goles = data.golesB;
    console.log(partido);

    if(partido.equipoA.goles > partido.equipoB.goles)
    {
      this.actualizarJugador(partido.equipoA, true);
      this.actualizarJugador(partido.equipoB, false);
    }
    else if(partido.equipoB.goles > partido.equipoA.goles)
    {
      this.actualizarJugador(partido.equipoA, false);
      this.actualizarJugador(partido.equipoB, true);
    }
    else
    {
      this.actualizarJugador(partido.equipoA, true);
      this.actualizarJugador(partido.equipoB, true);
    }

    this.partidoService.actualizar(partido);
    
    this.lista.closeSlidingItems();
  }

  actualizarJugador(equipo: Equipo, ganado: boolean)
  {
    let jugador = this.jugadores.filter( jugador => jugador.id == equipo.id)[0];
    console.log(jugador);
    if(ganado)
    {
      jugador.ganados++;
    }
    else
    {
      jugador.perdidos++;
    }
    this.dataService.actualizar(jugador);
  }

  guardarFoto(partido: Partido)
  {
    this.imagenService.sacarFoto(DataService.usuarioActual,partido);
    this.lista.closeSlidingItems();
  }

  async presentPopover(ev: any, partido:Partido) {
    const popover = await this.popoverController.create({
      component: FotoComponent,
      event: ev,
      mode: "ios",
      
      showBackdrop: true,
      animated: true,
      translucent: false,
      backdropDismiss: true,
      componentProps: {
        data : partido
      }
    });
  
    await popover.present();
  }


}
