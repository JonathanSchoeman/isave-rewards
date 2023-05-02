import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertainmentpayfailedPageRoutingModule } from './entertainmentpayfailed-routing.module';

import { EntertainmentpayfailedPage } from './entertainmentpayfailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertainmentpayfailedPageRoutingModule
  ],
  declarations: [EntertainmentpayfailedPage]
})
export class EntertainmentpayfailedPageModule {}
