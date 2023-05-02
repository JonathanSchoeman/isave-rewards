import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponwicodepaymentsuccessPageRoutingModule } from './couponwicodepaymentsuccess-routing.module';

import { CouponwicodepaymentsuccessPage } from './couponwicodepaymentsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponwicodepaymentsuccessPageRoutingModule
  ],
  declarations: [CouponwicodepaymentsuccessPage]
})
export class CouponwicodepaymentsuccessPageModule {}
