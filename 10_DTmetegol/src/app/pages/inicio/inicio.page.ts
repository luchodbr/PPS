import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, ModalController, ToastController, ViewDidLeave } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/services/data.service';
import { PartidosService } from 'src/app/services/partidos.service';
import { environment } from 'src/environments/environment';
import { LoginPage } from '../login/login.page';
import { RegistroPage } from '../registro/registro.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, ViewDidLeave
{
  usuario: Usuario = new Usuario();
  perfiles = environment.usuario;
  rol: string = "";

  constructor(private router: Router, 
              private actionSheetCtrl: ActionSheetController,
              public toastController: ToastController,
              private dataService: DataService,
              private modalController: ModalController,
              private partidoService: PartidosService,
              private loadingController: LoadingController) {}

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.dataService.leer();
    this.partidoService.leer();
    this.presentLoading("Ingresando...");
  }

  iniciarSesion(valor: string)
  {
      this.usuario = new Usuario();
     this.rol = valor;
  
      switch(this.rol)
      {
        case 'Admin' :
          this.usuario.email = this.perfiles.admin.email;
          this.usuario.pass = this.perfiles.admin.pass;
          this.usuario.rol = this.perfiles.admin.rol;
          break;
        case 'Tester' :
          this.usuario.email = this.perfiles.tester.email;
          this.usuario.pass = this.perfiles.tester.pass;
          this.usuario.rol = this.perfiles.tester.rol;
          break;
        case 'Usuario' :
          this.usuario.email = this.perfiles.usuario.email;
          this.usuario.pass = this.perfiles.usuario.pass;
          this.usuario.rol = this.perfiles.usuario.rol;
          break;
      }
      console.log(this.usuario);
      this.dataService.login(this.usuario).then(()=>{
        this.presentToast(`Perfil : ${this.usuario.rol}`);
        this.router.navigate(['/menu']);
      }).
      catch( err => this.presentToast(err));
  }

  async presentarLogin() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentarRegistro() {
    const modal = await this.modalController.create({
      component: RegistroPage,
    });
    return await modal.present();
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Perfiles de usuario',
      mode: 'ios',
      translucent: true,
      buttons: [{
        text: 'Administrador',
        role: 'close',
        icon: 'person-circle-outline',
        handler: () => {
          this.iniciarSesion('Admin');
        }
      }, {
        text: 'Tester',
        role: 'close',
        icon: 'eye-outline',
        handler: () => {
          this.iniciarSesion('Tester');
        }
      }, {
        text: 'Usuario',
        role: 'close',
        icon: 'finger-print-outline',
        handler: () => {
          this.iniciarSesion('Usuario');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      message,
      duration: 2000,
      spinner: 'lines',
      mode: 'ios'
    });
    await loading.present();
  }


}
