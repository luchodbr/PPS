import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargaResultadosPageRoutingModule } from './carga-resultados-routing.module';

import { CargaResultadosPage } from './carga-resultados.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargaResultadosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CargaResultadosPage]
})
export class CargaResultadosPageModule {}
