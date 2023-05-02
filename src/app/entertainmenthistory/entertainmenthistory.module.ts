import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertainmenthistoryPageRoutingModule } from './entertainmenthistory-routing.module';

import { EntertainmenthistoryPage } from './entertainmenthistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertainmenthistoryPageRoutingModule
  ],
  declarations: [EntertainmenthistoryPage]
})
export class EntertainmenthistoryPageModule {}
