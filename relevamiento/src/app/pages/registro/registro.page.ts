import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string;
  usuario: Usuario = {
    id :0,
    email: '',
    pass: ''
  };
  pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$";  
  confirmacionPass: string;
  mensaje: string;

  constructor(public toastController: ToastController, 
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmitTemplate()
  {
    console.log('Form submit');
    console.log(this.usuario);

    if(this.usuario.pass != this.confirmacionPass)
    {
      this.mensaje = "Las contraseñas no coinciden";
      this.presentToast();
    }
    else
    {
      this.dataService.registrar(this.usuario).then(res => {
        console.log("Usuario registrado");
        this.mensaje = "Se ha registrado exitosamente";
        this.router.navigate(['/home']);
        
      }, error => {
        console.error(error);
        this.mensaje = error.message;
      }).finally( () => this.presentToast());
    
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
