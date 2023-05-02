import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoucherpaymentsuccessPageRoutingModule } from './voucherpaymentsuccess-routing.module';

import { VoucherpaymentsuccessPage } from './voucherpaymentsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoucherpaymentsuccessPageRoutingModule
  ],
  declarations: [VoucherpaymentsuccessPage]
})
export class VoucherpaymentsuccessPageModule {}
