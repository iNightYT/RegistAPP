import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcercaDeLaAppPage } from './acerca-de-la-app.page';

const routes: Routes = [
  {
    path: '',
    component: AcercaDeLaAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcercaDeLaAppPageRoutingModule {}
