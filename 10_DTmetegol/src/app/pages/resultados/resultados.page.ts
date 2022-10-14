import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Partido } from 'src/app/clases/partido';
import { FotoComponent } from 'src/app/components/foto/foto.component';
import { PartidosService } from 'src/app/services/partidos.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {
  partidos: Partido[] = [];

  constructor(private partidoService: PartidosService, private popoverController: PopoverController) 
  {
    this.partidos = PartidosService.partidos.sort((a,b)=> this.ordenarPorFecha(a,b));
  }

  ngOnInit() {
  }

  ordenarPorFecha(partidoA: Partido, partidoB: Partido)
  {
    if(new Date(partidoA.fecha).getMilliseconds() > new Date(partidoB.fecha).getMilliseconds())
    {
      return -1;
    }
    else if(new Date(partidoA.fecha).getMilliseconds() < new Date(partidoB.fecha).getMilliseconds())
    {
      return 1;
    }
    else
    {
      return 0;
    }

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
