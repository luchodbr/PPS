import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargaResultadosPage } from './carga-resultados.page';

const routes: Routes = [
  {
    path: '',
    component: CargaResultadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargaResultadosPageRoutingModule {}
