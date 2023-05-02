import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertainmentpaynowPageRoutingModule } from './entertainmentpaynow-routing.module';

import { EntertainmentpaynowPage } from './entertainmentpaynow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertainmentpaynowPageRoutingModule
  ],
  declarations: [EntertainmentpaynowPage]
})
export class EntertainmentpaynowPageModule {}
