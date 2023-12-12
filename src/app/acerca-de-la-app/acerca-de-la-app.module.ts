import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcercaDeLaAppPageRoutingModule } from './acerca-de-la-app-routing.module';

import { AcercaDeLaAppPage } from './acerca-de-la-app.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcercaDeLaAppPageRoutingModule
  ],
  declarations: [AcercaDeLaAppPage]
})
export class AcercaDeLaAppPageModule {}
