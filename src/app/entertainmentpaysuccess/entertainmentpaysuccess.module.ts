import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntertainmentpaysuccessPageRoutingModule } from './entertainmentpaysuccess-routing.module';

import { EntertainmentpaysuccessPage } from './entertainmentpaysuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntertainmentpaysuccessPageRoutingModule
  ],
  declarations: [EntertainmentpaysuccessPage]
})
export class EntertainmentpaysuccessPageModule {}
