import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaPartidoPageRoutingModule } from './alta-partido-routing.module';

import { AltaPartidoPage } from './alta-partido.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaPartidoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AltaPartidoPage]
})
export class AltaPartidoPageModule {}
