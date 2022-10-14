import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { SplashComponent } from './splash/splash.component';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { FotoComponent } from './foto/foto.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SplashComponent,
    JugadoresComponent,
    FotoComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    SplashComponent,
    JugadoresComponent,
    FotoComponent
  ]
})
export class ComponentsModule { }
