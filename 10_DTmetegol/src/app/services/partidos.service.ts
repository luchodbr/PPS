import { Injectable } from '@angular/core';
import { database } from 'firebase';
import { Partido } from '../clases/partido';

@Injectable({
  providedIn: 'root'
})
export class PartidosService {
  public static partidos: Partido[] = [];

  constructor() { }

  public crear(partido: Partido): Promise<any>
  {
    return database().ref('partidos')
                    .push()
                    .then((snapshot) => partido.id = snapshot.key)
                    .then(() => this.actualizar(partido))
                    .catch(console.error);
  }

  public actualizar(partido: Partido): Promise<any>
  {
    return database().ref('partidos/' + partido.id)
                    .update(partido)
                    .then(() => console.info("Actualizacion exitosa"))
                    .catch(() => console.info("No se pudo actualizar"));
  } 

  public leer()
  {
    let partidos = [];
    console.info("Fetch de todos los partidos");

    const fetch = new Promise<any>(resolve =>{
      database().ref('partidos').on('value',(snapshot) => {          
        partidos = [];  
          snapshot.forEach((child) =>{
            var data: Partido = child.val();
            partidos.push(Partido.CrearPartido(child.key, data.equipoA, data.equipoB, 
                                                data.fecha, data.imagen));
          });
          console.log(partidos);
          // Se cargan los partidos
          PartidosService.partidos = partidos;
          resolve;
      })
    });
    return fetch;
  }
}
