import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaAsistenciaDocentePage } from './lista-asistencia-docente.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAsistenciaDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaAsistenciaDocentePageRoutingModule {}
