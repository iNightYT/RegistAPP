import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoCursosPageRoutingModule } from './listado-cursos-routing.module';

import { ListadoCursosPage } from './listado-cursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoCursosPageRoutingModule
  ],
  declarations: [ListadoCursosPage]
})
export class ListadoCursosPageModule {}
