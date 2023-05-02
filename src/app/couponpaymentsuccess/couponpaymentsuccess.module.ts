import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponpaymentsuccessPageRoutingModule } from './couponpaymentsuccess-routing.module';

import { CouponpaymentsuccessPage } from './couponpaymentsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponpaymentsuccessPageRoutingModule
  ],
  declarations: [CouponpaymentsuccessPage]
})
export class CouponpaymentsuccessPageModule {}
