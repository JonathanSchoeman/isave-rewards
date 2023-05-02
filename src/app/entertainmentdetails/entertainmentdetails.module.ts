import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertainmentdetailsPageRoutingModule } from './entertainmentdetails-routing.module';

import { EntertainmentdetailsPage } from './entertainmentdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertainmentdetailsPageRoutingModule
  ],
  declarations: [EntertainmentdetailsPage]
})
export class EntertainmentdetailsPageModule {}
