import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoCursosPage } from './listado-cursos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoCursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoCursosPageRoutingModule {}
