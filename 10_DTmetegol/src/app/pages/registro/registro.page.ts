import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: Usuario = new Usuario();
  emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  lettersPattern = /^[a-zA-Z ]{4,}$ /;
  dniPattern = /^[0-9]{7,8}$/;
  alphaPattern = /^[a-zA-Z0-9 ]+$/;
  phonePattern = /^[0-9]{10}$/;
  confirmacionPass: string;
  mensaje: string;

  constructor(public toastController: ToastController,
              private dataService: DataService,
              private router: Router,
              private modalController: ModalController) { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log('Form submit');
    console.log(this.usuario);
    
    if (this.usuario.pass != this.confirmacionPass) {
      this.mensaje = "Las contraseñas no coinciden";
      this.presentToast();
    }
    else {
      this.dataService.registrar(this.usuario).then(res => {
        console.log("Usuario registrado");
        this.mensaje = "Se ha registrado exitosamente";
        this.router.navigate(['/inicio']);
        this.modalController.dismiss();
      }, error => {
        console.error(error);
        this.mensaje = error.message;
      }).finally(() => this.presentToast());

    }

  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      duration: 2000
    });
    toast.present();
  }

}
