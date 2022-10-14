import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Imagen } from 'src/app/clases/imagen';
import { ImagenService } from 'src/app/services/imagen.service';

interface Serie {
  name: string,
  data: any,
}

enum Dia {
  Domingo,
  Lunes,
  Martes,
  Miercoles,
  Jueves,
  Viernes,
  Sabado
}

@Component({
  selector: 'app-grafico-torta',
  templateUrl: './grafico-torta.component.html',
  styleUrls: ['./grafico-torta.component.scss'],
})
export class GraficoTortaComponent implements OnInit {
  public highchart;
  public data;
  public semana: Dia[] = [Dia.Lunes, Dia.Martes, Dia.Miercoles, Dia.Jueves, 
                        Dia.Viernes, Dia.Sabado, Dia.Domingo];
  public fotos: Imagen[];
  public assets: string[] = [];

  constructor() {
    
  }


  ngOnInit() {
    this.fotos = ImagenService.fotosBonitas;
    if(this.fotos)
    {
      this.procesarDatos();   
      this.crearGrafico(this.assets);
    }
  }


  procesarDatos() {
    let votosPorDia = [];

    this.semana.forEach(dia => {
      let imgSrc = "";
      let mayorVotos = 0;
      let auxiliar;

      this.fotos.forEach(foto => 
      {
        if (new Date(foto.fecha).getDay() == dia) 
        {
          console.log(foto);

          if (foto.votos.length > mayorVotos) 
          {
            mayorVotos = foto.votos.length;
            imgSrc = foto.url;
            auxiliar = {
              name: new Date(foto.fecha).toISOString(),
              y: foto.votos.length
            };
          }
        }
      });
      if(auxiliar)
      {
        this.assets.push(imgSrc);
        votosPorDia.push(auxiliar);
      }

    });
    
    this.data = votosPorDia;
    console.log(this.data);
  }

  crearGrafico(imagenes: string[]) {
    this.highchart = new Chart(
    {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Fotos lindas'
      },
      subtitle: {
        text: 'Mayor cantidad de votos por día'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        useHTML: true,
        shared: true,
        shape: "square",
        borderRadius: 15,
        formatter: function() {
          var img = '<span>Foto con mayor cantidad de votos:'+this.y +'</span><br>'+
                    '<p><img src='+imagenes[this.point.x]+
                    ' width="600" height="150"></p>';

          return img;
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',

          dataLabels: {
            enabled: false
          },

          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: 'Votos',
        colorByPoint: true,
        data: this.data
      }]
    });
  }



}
