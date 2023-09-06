import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaAsistenciaDocentePageRoutingModule } from './lista-asistencia-docente-routing.module';

import { ListaAsistenciaDocentePage } from './lista-asistencia-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaAsistenciaDocentePageRoutingModule
  ],
  declarations: [ListaAsistenciaDocentePage]
})
export class ListaAsistenciaDocentePageModule {}
