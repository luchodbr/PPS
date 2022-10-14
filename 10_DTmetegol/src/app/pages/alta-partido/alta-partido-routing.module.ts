import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaPartidoPage } from './alta-partido.page';

const routes: Routes = [
  {
    path: '',
    component: AltaPartidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaPartidoPageRoutingModule {}
