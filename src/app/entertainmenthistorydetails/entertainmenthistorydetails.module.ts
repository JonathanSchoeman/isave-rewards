import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertainmenthistorydetailsPageRoutingModule } from './entertainmenthistorydetails-routing.module';

import { EntertainmenthistorydetailsPage } from './entertainmenthistorydetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertainmenthistorydetailsPageRoutingModule
  ],
  declarations: [EntertainmenthistorydetailsPage]
})
export class EntertainmenthistorydetailsPageModule {}
