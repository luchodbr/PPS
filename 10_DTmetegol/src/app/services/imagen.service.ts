import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Imagen } from '../clases/imagen';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { database } from 'firebase';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../clases/usuario';
import { UploadMetadata } from '@angular/fire/storage/interfaces';
import { Partido } from '../clases/partido';
import { PartidosService } from './partidos.service';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  public static imagenes = [];

  constructor(private storage : AngularFireStorage, private toastController: ToastController,
              private partidoService: PartidosService) 
  {
  }

  async sacarFoto(usuario: Usuario, partido: Partido) : Promise<Imagen>
  {
    let imagen: Imagen = new Imagen();

    Camera.getPhoto({      
      quality: 90,
      resultType: CameraResultType.Base64,
      correctOrientation: true,
      source: CameraSource.Prompt,
      promptLabelHeader: 'Subir foto',
      promptLabelCancel: 'Cancelar',
      promptLabelPhoto: 'Subir desde galería',
      promptLabelPicture: 'Nueva foto',
      presentationStyle: "popover",
      webUseInput: true,
      
      
    })
    .then( imageData => {
      console.log(imageData);
      imagen.base64 = imageData.base64String;
      imagen.fecha = new Date().toUTCString();
      imagen.usuario = partido.id;
      imagen.nombreUsuario = usuario.nombre;
  
      // Se sube imagen a Base de Datos
      this.crear(imagen).then( img => {
        imagen = img;
        // Se guarda imagen en el Storage
        this.guardarImagen(imagen)
            .then(snapshot => 
            {
              snapshot.ref.getDownloadURL()
                      .then(res => 
                      {
                        imagen.url = res;
                        partido.imagen = res;
                      })
            })
            .finally(() => 
            {
              this.actualizar(imagen);
              this.partidoService.actualizar(partido);
            });
      })
      .catch(console.error);
    })
    .catch( error => {
      this.presentToast(error);
    })
    return await imagen;
  }

  async guardarImagen(imagen: Imagen)
  {
    console.log("Guardar imagen-----------------------");
    const metadata: UploadMetadata = {
      contentType: 'image/jpeg',
      customMetadata: {
        user : imagen.usuario,
        userName : imagen.nombreUsuario,
        date : imagen.fecha,
      }
    };

    console.log(imagen);
    // Se sube imagen al Firebase Storage
    return this.storage.ref(`partidos/${imagen.id}`)
                        .putString(imagen.base64, firebase.storage.StringFormat.BASE64, metadata);
  }

  public async descargarImagen(carpeta: string, usuario: string)
  {
    return this.storage.ref(`partidos/${usuario}`).getDownloadURL()
  }

  private async crear(imagen: Imagen)
  {
    console.log(imagen);
    database().ref('fotos_partidos').push()
                    .then( snapshot => imagen.id = snapshot.key)
                    .catch(() => console.info("No se pudo realizar alta"));
    return imagen;
  }

  public actualizar(imagen: Imagen): Promise<any>
  {
    return database().ref('fotos_partidos/' + imagen.id)
                    .update(imagen)
                    .then(() => console.info("Actualizacion exitosa"))
                    .catch(() => console.info("No se pudo actualizar"));
  }

  public borrar(id: number): Promise<any>
  {
    return database().ref('fotos_partidos/' + id)
                    .remove()
                    .then(() => console.info("Imagen eliminada"))
                    .catch(() => console.info("No se pudo realizar la baja."));
  }

  public async fetchAll()
  {
    const fetch = await database().ref('fotos_partidos').on('value',(snapshot) => 
    {
      ImagenService.imagenes = [];

      snapshot.forEach((child) =>
      {
        var data = child.val();
        let aux = Imagen.CrearImagen(data.id, data.base64, data.url, data.usuario, data.nombreUsuario,
                                      data.fecha);
        ImagenService.imagenes.push(aux);
        
      });
      console.info("Fetch de todas las imagenes");
      console.info(ImagenService.imagenes);
    });
    return fetch;
  }



  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  comparadorFechas(fotoA: Imagen, fotoB: Imagen)
  {
    let retorno;

    if(new Date(fotoA.fecha).getMilliseconds() > new Date(fotoB.fecha).getMilliseconds())
    {
      retorno = -1;
    }
    else if(new Date(fotoA.fecha).getMilliseconds() < new Date(fotoB.fecha).getMilliseconds())
    {
      retorno = 1;
    }
    else
    {
      retorno = 0;
    }
    console.log(retorno);
    return retorno;
  }

}
