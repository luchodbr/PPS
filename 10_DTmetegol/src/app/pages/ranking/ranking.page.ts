import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private dataService: DataService) 
  {
  
  }

  ngOnInit() 
  {
    console.log(DataService.usuarios);
    this.usuarios = DataService.usuarios.sort((a,b)=> this.ordenarPorGanados(a,b)).slice(0,5);
  }

  ordenarPorGanados(equipoA: Usuario, equipoB: Usuario)
  {
    if(equipoA.ganados > equipoB.ganados)
    {
      return -1;
    }
    else if(equipoA.ganados < equipoB.ganados)
    {
      return 1;
    }
    else
    {
      return 0;
    }

  }

}
