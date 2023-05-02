import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TraveldetailsPageRoutingModule } from './traveldetails-routing.module';

import { TraveldetailsPage } from './traveldetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TraveldetailsPageRoutingModule
  ],
  declarations: [TraveldetailsPage]
})
export class TraveldetailsPageModule {}
