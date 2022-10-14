import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  mensaje: string;
  usuario: Usuario = {
    id :0,
    email: '',
    pass: ''
  };

  constructor(public alertCtrl: AlertController, 
              private dataService: DataService,
              public toastController: ToastController,
              private router: Router) { }

  ngOnInit() {
  }

  async presentAlertPrompt() {
    const alert = await this.alertCtrl.create({
      translucent: true,
      header: 'Ingrese el titulo',
      mode: "ios",
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Ingrese su email',
          
        },
        {
          name: 'password',
          type: 'text',
          placeholder: 'Ingrese su contraseña',
          attributes: {
            minLength: 6
          }
        }
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
          text: 'Ok',
          handler: (data) => {
            this.usuario.email = data.email;
            this.usuario.pass = data.password;
            this.dataService.login(this.usuario).then(()=>{
              this.mensaje = "Sesión iniciada.";
              this.presentToast();
              this.router.navigate(['/menu']);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.mensaje,
      duration: 2000
    });
    toast.present();
  }

}
