import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertainmentcinemasPageRoutingModule } from './entertainmentcinemas-routing.module';

import { EntertainmentcinemasPage } from './entertainmentcinemas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertainmentcinemasPageRoutingModule
  ],
  declarations: [EntertainmentcinemasPage]
})
export class EntertainmentcinemasPageModule {}
